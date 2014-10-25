
//variables
var windowWidth;	//window Dimensions
var windowHeight;

var $back;			//parallax layers
var $mid;
var $fore;

var pageAdd =1;		//how many pages (of 5) have been displayed
var potHeight;		//potential height of blog posts
var randShape; 		//determines div clip
var blogsPerPage = 5;

var offset = 0;			//which blog post to get 0 being the most recent
var limit;			//how many blog posts to get
var consKey;		//consumer key
var account;		//get from account
var blogsTaken = 0;

var app = angular.module('app', []);

$(document).ready(function() {

	windowWidth = $(window).width();
	windowHeight = $(window).height();
	
	$back = $("#background-view");
	$mid = $("#content");
	$fore = $("#foreground-view");

	//------------------------------------------------------------------------------------	resize
	$(window).resize(function() {
		windowWidth = $(window).width();
		windowHeight = $(window).height();
	});
	//------------------------------------------------------------------------------------	height of content divs
	//distance from top of screen to the point where the blog post will touch the bottom
	potHeight = (windowHeight - $('#blog-nav').height() )/2;
	//random top margin for initial content divs
	$('.new-test-div').each(function() {
		rand = Math.floor(Math.random() * potHeight);
		randShape = 1 + Math.floor(Math.random() * 4);
		$(this).addClass("clip" + randShape);//--------------------	set random class for clip
		$(this).css('margin-top' , rand + 'px');//-------------------	set random height
	});
	//remove the class to shuffle height
	$('.test-div').removeClass( "new-test-div" );
	//------------------------------------------------------------------------------------	scroll parallax
	$(window).scroll(function() {	

		scrollDist = $(window).scrollLeft();
		docWidth = $(document).width();
		//---------------------------------------------------------------	parallax image movement
		$back.css('background-position', -scrollDist*0.2 + "px 0px");
		$fore.css('background-position', -scrollDist*2 + "px 0px");
		//---------------------------------------------------------------	scroll hits the end of the document
		if( (scrollDist + windowWidth)  >= (docWidth-3) ) {
			//call angular function
			angular.element('#content-container').scope().getPost(5);	
					
		   pageAdd++;
		   $mid.css('width' , 3000*pageAdd +'px');
		   /*
		   //append 5 new blog posts
			$( '<div class="test-div new-test-div"></div>').appendTo( $("#content") );
			$( '<div class="test-div new-test-div"></div>').appendTo( $("#content") );
			$( '<div class="test-div new-test-div"></div>').appendTo( $("#content") );
			$( '<div class="test-div new-test-div"></div>').appendTo( $("#content") );
			$( '<div class="test-div new-test-div"></div>').appendTo( $("#content") );
			*/
			//set their random height
		   $('.new-test-div').each(function() {
				rand = Math.floor(Math.random() * potHeight);
				randShape = 1 + Math.floor(Math.random() * 4);
				$(this).addClass("clip" + randShape);				
				$(this).css('margin-top' , rand + 'px');
			});
			//remove the class that sets random heights
			$('.test-div').removeClass( "new-test-div" );

		}
	   
	});
});


	app.controller('mainCtrl', function($rootScope, $scope, $http){
		$rootScope.blogPostList = [];
		$rootScope.blogTemplate = [
			{
				"postID" : "",
				"image" : "",
				"title" : "",
			}
		];

		//function to get posts from tumblr
		limit= 1;
		consumerKey ="HEOkswS8esYqCMHCFlHqhhCa5ctvigQdwbEcz2fQD8rzPpE3bz";
		account="roweezy.tumblr.com"

		/*
		$scope.getTumblr = function(){
			//find blog offset
			$http.jsonp('http://api.tumblr.com/v2/blog/'+ account + '/posts?callback=JSON_CALLBACK&api_key=' + consumerKey).success(function(data) {
		  		$scope.totalPosts = data.response.total_posts;	//finds the amount of posts
		  		offset= $scope.totalPosts;
			});
		};
		*/

		$scope.getPost = function(offsetPost){
			$http.jsonp('http://api.tumblr.com/v2/blog/'+ account + '/posts?callback=JSON_CALLBACK&api_key=' + consumerKey + '&limit=' + limit + '&offset=' + offsetPost).success(function(postData) {
		  		
		  		$scope.postImage = postData.response.posts[0].photos[0].alt_sizes[1].url;
		  		$scope.postTitle = postData.response.posts[0].title;
		  		$scope.blogData =postData.response;			
				//console.log($scope.blogData); console.log($scope.postImage); console.log($scope.postTitle); console.log(offsetPost);

				$rootScope.blogTemplate[0].postID = offsetPost;
				$rootScope.blogTemplate[0].image = $scope.postImage;
				$rootScope.blogTemplate[0].title = $scope.blogTitle;

				console.log("whats inside blog template")
				console.log($rootScope.blogTemplate[0]);

				$rootScope.blogPostList.push($rootScope.blogTemplate[0]);
				console.log("whats inside blog list")
				console.log($rootScope.blogPostList);

				console.log("whats the blog#");
				console.log(blogsTaken);
				
				blogsTaken++;
			});			
		};


				$scope.getPost(blogsTaken);

	});

/*

			  			





		  		offset = $scope.totalPosts;
				console.log(offset);
*/








