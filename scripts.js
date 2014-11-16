
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
	//define window size
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	//initial angular get
	angular.element('#content-container').scope().getPost();

	$(window).resize(function() {
		windowWidth = $(window).width();
		windowHeight = $(window).height();
	});

	potHeight = (windowHeight - 450 )/2;

	$(window).scroll(function() {	
		scrollDist = $(window).scrollLeft();
		docWidth = $(document).width();

		$(".b1").css('background-position', -scrollDist*0.2 + "px 0px");
		$(".b2").css('background-position', -scrollDist*0.4 + "px 0px");

		//restrict page generation to the number of blog posts
		if( ((scrollDist + windowWidth)  >= (docWidth-3)) && blogsTaken < amountOfBlogs ) {
			//call angular function
			angular.element('#content-container').scope().getPost();	
					
		   pageAdd++;
		   $("#content").css('width' , 3000*pageAdd +'px');
		}
	   
	});
});


	app.controller('mainCtrl', function($scope, $scope, $http){
		//api requirements
		limit= 1;
		consumerKey ="HEOkswS8esYqCMHCFlHqhhCa5ctvigQdwbEcz2fQD8rzPpE3bz";
		account="visuallydefiant.tumblr.com"	
			
		//enlarge image for clicked blog
		$scope.clickBlog = function(slot){
			$scope.showSelected = true;
			$http.jsonp('http://api.tumblr.com/v2/blog/'+ account + '/posts?callback=JSON_CALLBACK&api_key=' + consumerKey + '&limit=' + limit + '&offset=' + slot).success(function(postData) {
				$scope.selectedBlogImage = postData.response.posts[0].photos[0].alt_sizes[0].url;
			});
		}		
		//blog container
		$scope.blogPostList = [];

		//function to add blog posts
		$scope.getPost = function(){
			if(blogsTaken < block){
				$http.jsonp('http://api.tumblr.com/v2/blog/'+ account + '/posts?callback=JSON_CALLBACK&api_key=' + consumerKey + '&limit=' + limit + '&offset=' + blogsTaken).success(function(postData) {
			  		//find the number of posts in the blog
			  		amountOfBlogs = postData.response.total_posts;
			  		//store information to be displayes (per blog)
			  		$scope.postImage = postData.response.posts[0].photos[0].alt_sizes[1].url;
			  		$scope.postImage = postData.response.posts[0].photos[0].alt_sizes[1].url;		//get post image
			  		$scope.postTitle = postData.response.posts[0].caption;							//get post title
			  		$scope.blogData = postData.response;											//get post series id
			  		$scope.randAng = "clip" + (1+ Math.floor(Math.random() * 9));					//give each post a random clip class
			  		//add elements to blog array
					$scope.blogPostList.push( {"image" : $scope.postImage, "inf" : $scope.postTitle, "postClip" : $scope.randAng, "postSlot" : blogsTaken} );
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
	app.controller('blog', function($scope){
		$scope.y = 80 + (Math.floor(Math.random() * potHeight));	
		$scope.getHeight = function(){
			return {'margin-top':$scope.y+'px'};
		}

	})

	 app.filter('stripText', function() {
	    return function(text) {
	      return String(text).replace(/<[^>]+>/gm, "").replace('&#8217;',"'");
	    }
	  }
	);







