'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MeanGenerator = module.exports = function MeanGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments); 

  this.appPath = this.env.options.appPath;

  this.headerFile = this.engine(this.read('_app/_views/jade/includes/head.jade'),
     this);

  this.footerFile = this.engine(this.read('_app/_views/jade/includes/foot.jade'),
     this);

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MeanGenerator, yeoman.generators.Base);

MeanGenerator.prototype.askForAppName = function askFor() {
  var cb = this.async();

  this.prompt([{
        type: 'input',
        name: 'appName',
        message: 'What is the name of your application?',
        filter: function(val) {
            return val.toLowerCase();
        },
        default: "myApp"
    }], function (props) {
    this.appName = props.appName;
    cb();
  }.bind(this));
};

MeanGenerator.prototype.askForBootstrap = function askFor() {
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'bootstrap',
    message: 'Would you like to include Twitter Bootstrap?',
    default: true
  }, {
    type: 'confirm',
    name: 'compassBootstrap',
    message: 'Would you like to use Twitter Bootstrap for Compass (as opposed to vanilla CSS)?',
    default: true,
    when: function (props) {
      return props.bootstrap;
    }
  }], function (props) {
    this.bootstrap = props.bootstrap;
    this.compassBootstrap = props.compassBootstrap;

    cb();
  }.bind(this));
};

MeanGenerator.prototype.askForDatabase = function askFor() {
  var cb = this.async();

  this.prompt([{
        type: 'list',
        name: 'dbAdapter',
        message: 'What kind of DB would you want to use primarily?',
        choices: ["MongoDB", "MySQL"],
        filter: function(val) {
            return val.toLowerCase();
        },
        default: "mongodb"
    }], function (props) {
    this.dbAdapter = props.dbAdapter;
    cb();
  }.bind(this));
};

MeanGenerator.prototype.askForConnectionString = function askFor() {
  var cb = this.async();

  this.prompt([{
        type: 'input',
        name: 'connectionString',
        message: 'What is your db connection string?',
        filter: function(val) {
            return val.toLowerCase();
        },
        default: "mongodb://localhost"
    }], function (props) {
    this.connectionString = props.connectionString;
    cb();
  }.bind(this));
};

MeanGenerator.prototype.askForTemplatingEngine = function askFor() {
  var cb = this.async();

  this.prompt([{
        type: 'list',
        name: 'templateEngine',
        message: 'What kind of template engine would you want to use?',
        choices: ["Jade", "Dot", "Hogan"],
        filter: function(val) {
            return val.toLowerCase();
        },
        default: "jade"
    }], function (props) {
    this.templateEngine = props.templateEngine;
    cb();
  }.bind(this));
};

MeanGenerator.prototype.bootstrapJS = function bootstrapJS() {
  if (!this.bootstrap) {
    return;  // Skip if disabled.
  }

  //#TODO
  // Wire Twitter Bootstrap plugins
  // this.indexFile = this.appendJadeScripts(this.indexFile, 'scripts/plugins.js', [
    
  // ]);
};

MeanGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/controllers');
    this.mkdir('app/models');
    this.mkdir('app/views');

    this.directory('_app/_controllers', 'app/controllers');
    this.directory('_app/_views/' + this.templateEngine, 'app/views');
    

    this.template('_app/_models/'+ this.dbAdapter + '/article.js', 'app/models/article.js');
    this.template('_app/_models/'+ this.dbAdapter + '/user.js', 'app/models/user.js');

    this.mkdir('config');

    this.directory('_config/' + this.dbAdapter, 'config');
    this.template('_config/'+ this.dbAdapter + '/config.js', 'config/config.js');


    this.mkdir('public');
    if (this.compassBootstrap){
        this.directory('_public', 'public');
    }
    else{
        this.directory('nosass/_public', 'public');
    }
   
    

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_.bowerrc', '.bowerrc');
    this.copy('_server.js', 'server.js');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_README.md', 'README.md');
    this.copy('_Procfile', 'Procfile');
    this.copy('_travis.yml', 'travis.yml');

    // this.on('end', function() {
    //     this.installDependencies();
    // });
};

