var app = angular.module('app', ['ui.router'])

 //routing
app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'html/home.html',
      controller: 'testCtrl'
    })

    .state('themeSpirit', {
      url: '/themeSpirit',
      templateUrl: 'html/themeSpirit.html',
      controller: 'testCtrl'
    })

    .state('drinkInfo', {
      url: '/drinkInfo',
      templateUrl: 'html/drinkInfo.html',
      controller: 'testCtrl'
    })   

    .state('test', {
      url: '/test',
      templateUrl: 'html/test.html',
    })

    .state('result', {
      url: '/result',
      templateUrl: 'html/result.html',
    })      
}])

//controller
app.controller('testCtrl', function($rootScope, $scope, $http){

  /*
  $http.get("json/alc.json").success(function(data) {
    $scope.spirits = data;
  });
  console.log($scope.spirits);
  */
  
  $scope.spirits = [
  {
    "name":"Vodka",
    "desc": "Looks like water tastes like ass", 
    "img":"images/vodka.jpg",
    "additional": "testadditional",
    "origin": "somewhere",
    "taste": "ass"    
  },
  {
    "name":"Scotch",
    "desc": "For people who want to look rich",
    "img": "images/scotch.jpg",
    "additional": "test scotch additional",
    "origin": "somewhere",
    "taste": "ass"    
   },
  {
    "name":"Bourbon",
    "desc": "A pleasant sugerlike scotch",
    "img": "images/bourbon.png",
    "additional": "test bourb additional",
    "origin": "Russia",
    "taste": "ass"    
   },     
   {
    "name":"Rum",
    "desc": "The greatest",
    "img": "images/rum.jpg",
    "additional": "test rum additional",
    "origin": "Caribbean",
    "taste": "sweet, heavy"    
   },   
   {
    "name":"Whisky",
    "desc": "Rough and tough",
    "img": "images/whisky.jpg",
    "additional": "test whisky additional",
    "origin": "somewhere",
    "taste": "ass"    
   },      
   {
    "name":"Tequila",
    "desc": "sosososososo sloppy",
    "img": "http://www.tequilasource.com/bottles/pics/cabo_uno_reserva_tequila_r2.jpg",
    "additional": "test whisky additional",
    "origin": "somewhere",
    "taste": "ass"    
   },   
   {
    "name":"Gin",
    "desc": "Easy to mix with just about anything",
    "img": "images/gin.jpg",
    "additional": "test gin additional",
    "origin": "somewhere",
    "taste": "ass"    
   },   
   {
    "name":"Brandy",
    "desc": "k",
    "img": "images/brandy.jpg",
    "additional": "test brandy additional",
    "origin": "somewhere",
    "taste": "ass"
   },     
];



$scope.drinks = [
  {
    name:'Mint Julep', 
    alcohol:'Bourbon',
    desc: 'julepy',
    img: 'images/mintJulep.jpg',
    origin: 'somewhere',
    taste: 'minty',
    ingred: ["test1","test2","test3","test4","test5"],
    proced: ["dothing1", "dothing2", "dothing3"],
  },
  {
    name:'Margarita', 
    alcohol: 'Tequila',
    desc: 'sassy',
    img: 'images/margarits.jpg',
    origin: 'somewhere',
    taste: 'sour',
    ingred: ["test11","test22","test33","test44","test55"],
    proced: ["dothing1", "dothing2", "dothing3"],     
  },
  {
    name:'Salty Dog', 
    alcohol: 'Gin',
    desc: 'sharp',
    img: 'images/dog.jpg',
    origin: 'somewhere',
    taste: 'good',
    ingred: ["test12","dfg","sfgsfg","dfbxjhdt","watadffdag"],
    proced: ["dothing1", "dothing2", "dothing3"],        
  },        
  {
    name:'Martini', 
    alcohol: 'Vodka',
    desc: 'popular',
    img: 'images/martini.png',
    origin: 'somewhere',
    taste: 'sharp',
    ingred: ["aaaaaaaaa","ssssssss","dddddddddd","fffffffffff","ggggggggg"],
    proced: ["dothing1", "dothing2", "dothing3"],        
  },
  {
    name:'Cosmopolitan', 
    alcohol: 'Vodka',
    desc: 'sharp',
    img: 'images/cosmo.jpg',
    origin: 'somewhere',
    taste: 'like the magazine',
    ingred: ["l","p","o","i","u"],
    proced: ["dothing1", "dothing2", "dothing3"],        
  },  
  {
    name:'Mojito',
     alcohol: 'Rum',
    desc: 'good',
    img: 'images/mojito.png',
    origin: 'somewhere',
    taste: 'so good',
    ingred: ["a1","b2","c3","d4","e5"],
    proced: ["dothing1", "dothing2", "dothing3"],         
   },
  {
    name:'Matador', 
    alcohol: 'Tequila',
    desc: 'great',
    img: 'images/matador.jpg',
    origin: 'somewhere',
    taste: 'like a bull',
    ingred: ["xgffgh","xgfh"],
    proced: ["dothing1", "dothing2", "dothing3"],        
  },
  {
    name:'Churchill', 
    alcohol: 'Whisky',
    desc: 'rich',
    img: 'images/church.jpg',
    origin: 'somewhere',
    taste: 'like whisky',
    ingred: ["xhxh","xhxh","xhxh","xhxh","xhh"],
    proced: ["dothing1", "dothing2", "dothing3"],        
  }
];

  //======================================================================= display ingredients
  $scope.ingredientsTab = function() {
    $rootScope.displayIngreds = [];
    $rootScope.displayProcess =[];
    for(var i=0 ; i < $scope.drinks.length ; i++){
      if($scope.drinks[i].name == $rootScope.drinkSelected){
        for(var j=0 ; j < $scope.drinks[i].ingred.length ; j++){
          $scope.displayIngreds.push($scope.drinks[i].ingred[j])
        }
        for(var j=0 ; j < $scope.drinks[i].proced.length ; j++){
          $scope.displayProcess.push($scope.drinks[i].proced[j])
        }
      }
    }
  }

  //======================================================================= save drink selected to root scope
  $scope.selectedD =function(sel){
    $rootScope.drinkSelected = sel;
  };

  //======================================================================= alc descriptions
  //empty description array
  $scope.alcDescriptions = [
    {
      name: '',
      desc: '',
      img: '',
      origin: '',
      taste: '',
    }
  ];

  //fill description array
  $scope.descShow = function(hov){
    for(var i=0 ; i < $scope.drinks.length ; i++){
      //change values for mouse over spirits
      if($scope.spirits[i].name == hov){
        $scope.alcDescriptions.name = $scope.spirits[i].name;
        $scope.alcDescriptions.desc = $scope.spirits[i].desc;
        $scope.alcDescriptions.img = $scope.spirits[i].img;
        $scope.alcDescriptions.origin = $scope.spirits[i].origin;
        $scope.alcDescriptions.taste = $scope.spirits[i].taste;
      }
      //change values for mouse over drinks
      if($scope.drinks[i].name == hov) {
        $scope.alcDescriptions.name = $scope.drinks[i].name;
        $scope.alcDescriptions.desc = $scope.drinks[i].desc;
        $scope.alcDescriptions.img = $scope.drinks[i].img;
        $scope.alcDescriptions.origin = $scope.drinks[i].origin;
        $scope.alcDescriptions.taste = $scope.drinks[i].taste;
      }
    }
  }


  //======================================================================= searchbar functionality
  $scope.hideSearchAndClear = function() {
    $scope.hideSearch=false;
    $scope.searchCriteriaClear($scope.searchCriteria); 
  }
  $scope.searchCriteriaClear = function(searchCriteria){
    $scope.searchCriteria="";
  }
  

  //======================================================================= filter drinks
  $scope.filterFull = function(){
    $scope.filtered=[];
    for(var j=0 ; j < $scope.drinks.length ; j++){
      $scope.filtered[j] = $scope.drinks[j].name;
    }    
  }

  //initially fill array with all drinks
  $scope.filterFull();

  //== filter drinks by alcohol selected ==//
  $scope.drinkFilter = function(alc) {
  	$scope.filtered=[];
	  for(var i=0 ; i < $scope.drinks.length ; i++){
  		if($scope.drinks[i].alcohol == alc){
  			$scope.filtered.push($scope.drinks[i].name);
      }
	  }
  };






});







































