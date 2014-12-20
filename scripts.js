var app = angular.module('app',[]);

app.controller('mainCTRL', function($scope,$http){

	$scope.posterList = [];

	//get()
	$scope.get = function(){
		//all_docs to get a list of all douments in the database
		//include_docs=true to get the fields of each result
		$http.get('http://emiliovillante.iriscouch.com/postertest/_all_docs?include_docs=true').success(function(data){
			angular.forEach(data.rows ,function(row){
				$scope.posterList.push(row.doc)
			})
			console.log($scope.posterList)
		})
	}
	$scope.get();

	//post()
	$scope.post = function(){
		var obj = {
			"artist":$scope.artist,
			 "style":$scope.style
			}
		$http.post('http://emiliovillante.iriscouch.com/postertest',obj).success(function(data){
			console.log(data)
			$scope.posterList.push({
				"_id":data.id,
				"_rev":data.rev,
				"artist":$scope.artist,
				"style":$scope.style
			})
		})
	}

	//edit(artist,style)
	$scope.put = function(id, artist, style){
		console.log(artist)
		//rev needs to be +1 - current rev addon
		var obj = {
			"_id":"51c073193d667beaceb8b4797b000db5",
			"_rev":"2-bd5d9e427a6dc89411f9cb2d1707590a",
			"artist":artist,
			"style":style
		}
		$http.put('http://emiliovillante.iriscouch.com/postertest/51c073193d667beaceb8b4797b000db5',obj).success(function(data){
			console.log(data)
		})		
	}
})

app.controller('posterRowCtrl', function($scope){

})






