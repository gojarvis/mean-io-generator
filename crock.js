function identity(x){
	return x
}

function add(x,y){
	return x+y
}

function mul(x,y){
	return x*y
}

function identityf(x){
	return function(){
		return x
	}
}


function addf(x){
	return function(y){
		return x+y;
	}
}

function countrf(x){
	return {
		inc: function(){
			return x++;
		},
		res: function(){
			return x;
		}
	}
}

function applyf(binary){
	return function(x){
		return function(y){
			return binary(x,y);
		}
	}
}

