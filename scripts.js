
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

var limit;			//how many blog posts to get
var consKey;		//consumer key
var account;		//get from account
var blogsTaken = 0;
var block = blogsPerPage;	//variable for pull amount. Initially set as the number of blogs per 'page'
var amountOfBlogs = 0;

var app = angular.module('app', []);

$(document).ready(function() {

	windowWidth = $(window).width();
	windowHeight = $(window).height();
	
	$back = $("#background-view");
	$mid = $("#content");
	$fore = $("#foreground-view");

	angular.element('#content-container').scope().getPost();

	//------------------------------------------------------------------------------------	resize
	$(window).resize(function() {
		windowWidth = $(window).width();
		windowHeight = $(window).height();
	});

	//------------------------------------------------------------------------------------	height of content divs
	//distance from top of screen to the point where the blog post will touch the bottom
	potHeight = (windowHeight - $('#blog-nav').height() )/2;

	//------------------------------------------------------------------------------------	scroll movement / functionality
	$(window).scroll(function() {	

		scrollDist = $(window).scrollLeft();
		docWidth = $(document).width();
		//---------------------------------------------------------------	parallax image movement
		$back.css('background-position', -scrollDist*0.2 + "px 0px");
		$fore.css('background-position', -scrollDist*2 + "px 0px");
		//---------------------------------------------------------------	scroll hits the end of the document
		//restrict page generation to the number of blog posts
		if( ((scrollDist + windowWidth)  >= (docWidth-3)) && blogsTaken < amountOfBlogs ) {
			//call angular function
			angular.element('#content-container').scope().getPost();	
					
		   pageAdd++;
		   $mid.css('width' , 3000*pageAdd +'px');
		}
	   
	});
});


	app.controller('mainCtrl', function($scope, $scope, $http){
		//array that contains all of the blog posts
		$scope.blogPostList = [];

		//function to get posts from tumblr
		limit= 1;
		consumerKey ="HEOkswS8esYqCMHCFlHqhhCa5ctvigQdwbEcz2fQD8rzPpE3bz";
		account="visuallydefiant.tumblr.com"


		//function to add blog posts (1 at a time)
		$scope.getPost = function(){
			if(blogsTaken < block){
				$http.jsonp('http://api.tumblr.com/v2/blog/'+ account + '/posts?callback=JSON_CALLBACK&api_key=' + consumerKey + '&limit=' + limit + '&offset=' + blogsTaken).success(function(postData) {
			  		//find the number of posts in the blog
			  		amountOfBlogs = postData.response.total_posts;
			  		//store information to be displayes (per blog)
			  		$scope.postImage = postData.response.posts[0].photos[0].alt_sizes[1].url;		//get post image
			  		$scope.postTitle = postData.response.posts[0].title;							//get post title
			  		$scope.blogData = postData.response;											//get post series id
			  		$scope.randAng = "clip" + (1+ Math.floor(Math.random() * 4));					//give each post a random clip class

					$scope.blogPostList.push( {"postID" : $scope.blogData, "image" : $scope.postImage, "title" : $scope.postTitle, "postClip" : $scope.randAng} );
					//get next blog post
					blogsTaken++;

					//run the function until 
					$scope.getPost();				
				});	
			} else {
				block += 5;
			};	
		};
	})
	
	//generate random height. feeds into ng-style
	app.controller('randHeight', function($scope){
		$scope.y = 90 + Math.floor(Math.random() * (windowHeight-570));	
		$scope.getHeight = function(){
			return {'margin-top':$scope.y+'px'};
		}
	})








