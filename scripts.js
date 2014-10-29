
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

var block = 5;

var app = angular.module('app', []);

$(document).ready(function() {

	angular.element('#content-container').scope().getPost();

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
	// $('.new-test-div').each(function() {
	// 	rand = Math.floor(Math.random() * potHeight);
	// 	randShape = 1 + Math.floor(Math.random() * 4);
	// 	$(this).addClass("clip" + randShape);//--------------------	set random class for clip
	// 	$(this).css('margin-top' , rand + 'px');//-------------------	set random height
	// });
	//remove the class to shuffle height
	$('.test-div').removeClass( "new-test-div" );


	//------------------------------------------------------------------------------------	scroll movement / functionality
	$(window).scroll(function() {	

		scrollDist = $(window).scrollLeft();
		docWidth = $(document).width();
		//---------------------------------------------------------------	parallax image movement
		$back.css('background-position', -scrollDist*0.2 + "px 0px");
		$fore.css('background-position', -scrollDist*2 + "px 0px");
		//---------------------------------------------------------------	scroll hits the end of the document
		if( (scrollDist + windowWidth)  >= (docWidth-3) ) {
			//call angular function
			angular.element('#content-container').scope().getPost();	
					
		   pageAdd++;
		   $mid.css('width' , 3000*pageAdd +'px');

		 //   $('.new-test-div').each(function() {
			// 	rand = Math.floor(Math.random() * potHeight);
			// 	randShape = 1 + Math.floor(Math.random() * 4);
			// 	$(this).addClass("clip" + randShape);				
			// 	$(this).css('margin-top' , rand + 'px');
			// });
			//remove the class that sets random heights
			$('.test-div').removeClass( "new-test-div" );

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
			  		
			  		$scope.postImage = postData.response.posts[0].photos[0].alt_sizes[1].url;		//get post image
			  		$scope.postTitle = postData.response.posts[0].title;							//get post title
			  		$scope.blogData = postData.response;											//get post series id
			  		$scope.randAng = "clip" + (1+ Math.floor(Math.random() * 4));					//give each post a random clip class
			  		console.log("random number is: " + $scope.randAng);	

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


		//$scope.getPost(blogsTaken);

	});









