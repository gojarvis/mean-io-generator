/**
 * Module dependencies.
 */

var env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    Schema = require('jugglingdb').Schema,
    schema = new Schema('mongodb', {url: config.db});

var User = require('./user');

/**
 * Article Schema
 */
var Article = schema.define('Article',{
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user_id  : {type : String}

});



Article.belongsTo(User, {as: 'user', foreignKey: 'user_id'});


Article.load = function (id, cb) {
  this.find(id, cb);
}

// schema.model('Article', ArticleSchema);

module.exports = schema.models.Article;
