// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ion-floating-menu','starter.services'])

.run(function($ionicPlatform,$rootScope,$location,$ionicHistory,$ionicPopup) {
	$rootScope.myGoBack = function() {
	   $ionicHistory.goBack();
	};
	
    $rootScope.goto=function(url){
	   $location.path(url)
	} 
    $rootScope.activeItemMenu=function(index){
	   $rootScope.activeMenu=index;
	}
    
  $rootScope.activeMenu=0;
  $rootScope.activeimg1="img/m2.png";

    
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar){
      //org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.forget_password=function (){	
	$ionicPopup.show({
	template: 'Enter your email address below.<label class="item item-input" style="  height: 34px; margin-top: 10px;"><input  type="email"  /></label>',
	title: 'Forget Password',
	subTitle: ' ',
	scope: $rootScope,
	buttons: [
	{text: '<b>Send</b>',
	type: 'button-positive'},
	{ text: 'Cancel' ,
	type: 'button-positive'},
	]
	});	
	};
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('').previousTitleText('')  ;
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
  })

.state('app.contact', {
    url: "/contact",
    views: {
      'menuContent': {
        templateUrl: "templates/contact.html"
      }
    }
  })
.state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html"
      }
    }
  })

  .state('app.detail', {
    url: "/detail",
    views: {
      'menuContent': {
        templateUrl: "templates/detail.html",
        controller: 'detailCtrl'
      }
    }
  })
  .state('app.comment', {
    url: "/comment",
    views: {
      'menuContent': {
        templateUrl: "templates/comment.html"
      }
    }
  })
    .state('app.gallery', {
      url: "/gallery",
      views: {
        'menuContent': {
          templateUrl: "templates/gallery.html",
          controller: 'galleryCtrl'
        }
      }
    })
  .state('login', {
      url: "/login",
          templateUrl: "templates/login.html",
          controller: 'loginCtrl'
    })
    .state('3DRoom', {
      url: "/3DRoom",
          templateUrl: "templates/3DRoom.html",
          controller: "3DCtrl"
    })
   .state('register', {
      url: "/register",
          templateUrl: "templates/register.html"
    })	
 .state('app.dashboard', {
      url: "/dashboard",
      views: {
        'menuContent': {
          templateUrl: "templates/dashboard.html"
        }
      }
    })	

  
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/dashboard');
  $urlRouterProvider.otherwise('/login');
});
