angular.module('starter.controllers', ['ngFlowGrid'])

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout,$http,$window, UserService, $ionicActionSheet, $state, $ionicLoading) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.users = {};
  $scope.user = UserService.getUser();

  $scope.username = $window.localStorage['username'];
  $scope.password = $window.localStorage['password'];
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function(user) {
    if(user.username == "undefined" || user.password == "undefined"){
      alert("Username or Password cannot be empty!");
    }else{
      console.log('input username: ', user.username);
      console.log('input password: ', user.password);
      $http.get('http://www.lukegong.com/getAll.php').success(function(json){ 
        var bool = 0;
        angular.forEach(json, function(item){
          if(user.username == item.username && user.password == item.password){
            $window.localStorage['username'] = user.username;
            $window.localStorage['password'] = user.password;
            bool = 1;
          }
        })
        if(bool == 1){
           $state.go('app.dashboard');
         }else{
            alert("wrong password or username");
         }
      });
    }
  };
  $scope.logout = function(){
      var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout',
      titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
      cancelText: 'Cancel',
      cancel: function() {},
      buttonClicked: function(index) {
        return true;
      },
      destructiveButtonClicked: function(){
        $ionicLoading.show({
          template: 'Logging out...'
        });

        // Facebook logout
        facebookConnectPlugin.logout(function(){
          $window.localStorage.clear();
          $ionicLoading.hide();
          $rootScope.goto("/login");
        },
        function(fail){
          $ionicLoading.hide();
        });
      }
    });
    //$rootScope.goto("/login");
  };

  if(typeof $scope.username == "undefined"){
    $rootScope.goto("/login");
  }else{
    $rootScope.goto("/login");
  }
})

.controller('detailCtrl',function($scope,$stateParams, $http, Movies){
  var imdbID = $stateParams.imdbID;
  var getDetail = function(imdbID){
    Movies.getDetail(imdbID).then(function(response){
      var details = response.data;
      $scope.details = details;
      console.log(details);
    },function(error){
      console.log("erroe");
    });
  };

  $scope.$on('$ionicView.enter', function() {   
    getDetail(imdbID);
  });
})

.controller('galleryCtrl',['$scope','fgDelegate',function($scope,fgDelegate){
    $scope.items = [
    {
      id:1,
      img:'img/floorplan/building.jpg',
      name:'building',
    },
    {
      id:2,
      img:'img/floorplan/mf6IfoU.jpg',
      name:'building',
    },
    {
      id:3,
      img:'img/floorplan/villa_building_3d_model_max_b816852b-7ddf-4e80-a216-a890faef675b.jpg',
      name:'building',
    },
    {
      id:4,
      img:'img/floorplan/mf6IfoU.jpg',
      name:'building',
    },
    {
      id:5,
      img:'img/floorplan/winsun-front.jpg.662x0_q70_crop-scale.jpg',
      name:'building',
    },
    {
      id:6,
      img:'img/floorplan/mf6IfoU.jpg',
      name:'building',
    },
    {
      id:7,
      img:'img/floorplan/villa_building_3d_model_max_b816852b-7ddf-4e80-a216-a890faef675b.jpg',
      name:'building',
    },
    {
      id:8,
      img:'img/floorplan/building.jpg',
      name:'building',
    },
    {
      id:9,
      img:'img/floorplan/villa_building_3d_model_max_b816852b-7ddf-4e80-a216-a890faef675b.jpg',
      name:'building',
    },
    {
      id:10,
      img:'img/floorplan/winsun-front.jpg.662x0_q70_crop-scale.jpg',
      name:'building',
    },
    {
      id:11,
      img:'img/floorplan/building.jpg',
      name:'building',
    },
    
  ]

}])

.controller('loginCtrl', function($scope, $state, $q, UserService, $ionicLoading,$window) {
  // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });
      $window.localStorage['username'] = profileInfo.name;
      $ionicLoading.hide();
      $state.go('app.dashboard');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

        // Check if we have our user saved
        var user = UserService.getUser('facebook');

        if(!user.userID){
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            $state.go('app.dashboard');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
        }else{
          $state.go('app.dashboard');
        }
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
})
.controller('3DCtrl',function($scope,$rootScope){
              var r = "textures/cube/Bridge2/";
        var urls = [
          r + "posx.jpg", r + "negx.jpg",
          r + "posy.jpg", r + "negy.jpg",
          r + "posz.jpg", r + "negz.jpg"
        ];

        var textureCube = new THREE.CubeTextureLoader().load( urls );
        textureCube.format = THREE.RGBFormat;
  var mlib = {
        "Orange":   new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
        "Blue":   new THREE.MeshLambertMaterial( { color: 0x001133, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
        "Red":    new THREE.MeshLambertMaterial( { color: 0x660000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
        "Black":  new THREE.MeshLambertMaterial( { color: 0x000000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.15 } ),
        "White":  new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),

        "Carmine":  new THREE.MeshPhongMaterial( { color: 0x770000, specular:0xffaaaa, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Gold":   new THREE.MeshPhongMaterial( { color: 0xaa9944, specular:0xbbaa99, shininess:50, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Bronze": new THREE.MeshPhongMaterial( { color: 0x150505, specular:0xee6600, shininess:10, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
        "Chrome":   new THREE.MeshPhongMaterial( { color: 0xffffff, specular:0xffffff, envMap: textureCube, combine: THREE.MultiplyOperation } ),

        "Orange metal": new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Blue metal":   new THREE.MeshLambertMaterial( { color: 0x001133, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Red metal":  new THREE.MeshLambertMaterial( { color: 0x770000, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Green metal":  new THREE.MeshLambertMaterial( { color: 0x007711, envMap: textureCube, combine: THREE.MultiplyOperation } ),
        "Black metal":  new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube, combine: THREE.MultiplyOperation } ),

        "Pure chrome":  new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube } ),
        "Dark chrome":  new THREE.MeshLambertMaterial( { color: 0x444444, envMap: textureCube } ),
        "Darker chrome":new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube } ),

        "Black glass":  new THREE.MeshLambertMaterial( { color: 0x101016, envMap: textureCube, opacity: 0.975, transparent: true } ),
        "Dark glass": new THREE.MeshLambertMaterial( { color: 0x101046, envMap: textureCube, opacity: 0.25, transparent: true } ),
        "Blue glass": new THREE.MeshLambertMaterial( { color: 0x668899, envMap: textureCube, opacity: 0.75, transparent: true } ),
        "Light glass":  new THREE.MeshBasicMaterial( { color: 0x223344, envMap: textureCube, opacity: 0.25, transparent: true, combine: THREE.MixOperation, reflectivity: 0.25 } ),

        "Red glass":  new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.75, transparent: true } ),
        "Yellow glass": new THREE.MeshLambertMaterial( { color: 0xffffaa, opacity: 0.75, transparent: true } ),
        "Orange glass": new THREE.MeshLambertMaterial( { color: 0x995500, opacity: 0.75, transparent: true } ),

        "Orange glass 50":  new THREE.MeshLambertMaterial( { color: 0xffbb00, opacity: 0.5, transparent: true } ),
        "Red glass 50":   new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),

        "Fullblack rough":  new THREE.MeshLambertMaterial( { color: 0x000000 } ),
        "Black rough":    new THREE.MeshLambertMaterial( { color: 0x050505 } ),
        "Darkgray rough": new THREE.MeshLambertMaterial( { color: 0x090909 } ),
        "Red rough":    new THREE.MeshLambertMaterial( { color: 0x330500 } ),

        "Darkgray shiny": new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } ),
        "Gray shiny":   new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } )
      };


  var onRenderFcts= [];

    var mesh;
    var container = document.getElementById("three");
    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.cullFace = THREE.CullFaceBack;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.set( 50, 50, 0 );
    camera.lookAt( scene.position );

    scene.add( new THREE.AmbientLight(0x404040 ));

    scene.fog = new THREE.Fog(0x222233, 0, 20000);
    renderer.setClearColor( scene.fog.color, 1 );

    $scope.addGround = function(){
      // add ground
      var  grassMat = new THREE.MeshStandardMaterial( {
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 0.0005,
      });
      var textureLoader = new THREE.TextureLoader();
      textureLoader.load( "textures/terrain/grasslight-big.jpg", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(  2.5, 6);
        grassMat.map = map;
        grassMat.needsUpdate = true;
      } );
      var groundGeo = new THREE.PlaneBufferGeometry(100,100);
      var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff} );
      groundMat.color.setHSL( 0.095, 1, 0.75 );
      //ground
      var ground = new THREE.Mesh( groundGeo, grassMat );
      ground.rotation.x = -Math.PI/2;
       ground.position.y = -10;
      scene.add(ground);
      ground.receiveShadow = true;
    }
    //resize
    THREEx.WindowResize(renderer, camera);

  THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
    console.log( item+"==="+loaded+"==="+ total );
   // document.getElementById("loading").innerHTML = "Loading...";
          var bar = 250;

          if ( total )
            bar = Math.floor( bar * loaded / total );
          document.getElementById("bar").setAttribute("style","width:250px;");
          document.getElementById( "bar" ).style.width = bar + "px";
};

THREE.DefaultLoadingManager.onLoad = function () {
    console.log("load finish");
    document.getElementById("message").setAttribute("style","display:none;");
    document.getElementById("progressbar").setAttribute("style","display:none;");
    document.getElementById("progress").setAttribute("style","display:none;");
    //scene.add(mesh);
};

    //add house
    document.getElementById("progress").setAttribute("style","display:block;");
    document.getElementById( "progress" ).style.display = "block";
   
    //add ground
    //$scope.addGround();
    //add daylight
    daylightMode();

    //add room
    //--------
    var clock = new THREE.Clock();
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0, 0 );
    controls.update();
    animate();   
   
    $scope.loadCar = function(){
      var loader = new THREE.BinaryLoader();
        loader.load(" models/gallardo/GallardoNoUv_bin.js",function(geometry){
          createScene(geometry);
        }); 
    }

    $scope.loadCar();
      function createScene(geometry) {

        geometry.sortFacesByMaterialIndex();

        var m = new THREE.MultiMaterial(),
            materials = {
              body: [

                [ "Orange",   mlib[ "Orange" ] ],
                [ "Blue",     mlib[ "Blue" ] ],
                [ "Red",    mlib[ "Red" ] ],
                [ "Black",    mlib[ "Black" ] ],
                [ "White",    mlib[ "White" ] ],

                [ "Orange metal",   mlib[ "Orange metal" ] ],
                [ "Blue metal",   mlib[ "Blue metal" ] ],
                [ "Green metal",  mlib[ "Green metal" ] ],
                [ "Black metal",  mlib[ "Black metal" ] ],

                [ "Carmine",  mlib[ "Carmine" ] ],
                [ "Gold",     mlib[ "Gold" ] ],
                [ "Bronze",   mlib[ "Bronze" ] ],
                [ "Chrome",   mlib[ "Chrome" ] ]

              ]
          };
          mmap = {

          0: mlib[ "Pure chrome" ],   // wheels chrome
          1: mlib[ "Black rough" ],   // tire
          2: mlib[ "Black glass" ],   // windshield
          3: mlib[ "Bronze" ],     // body
          4: mlib[ "Red glass" ],     // back lights
          5: mlib[ "Yellow glass" ],  // front lights
          6: mlib[ "Dark chrome" ]  // windshield rim
        };

        for ( var i in mmap ) {

          m.materials[ i ] = mmap[ i ];

        }

        var car = new THREE.Mesh( geometry, m );

        car.scale.set(0.1,0.1,0.1);
        scene.add( car );
      }

    function daylightMode(){
        //////////////////////////////////////////////////////////////////////////////////
        //    comment               //
        //////////////////////////////////////////////////////////////////////////////////
        var sunAngle = -1/6*Math.PI*2;
        onRenderFcts.push(function(delta, now){
          var dayDuration = 10  // nb seconds for a full day cycle
          sunAngle  += delta/dayDuration * Math.PI*2
        })
        //////////////////////////////////////////////////////////////////////////////////
        //    starfield             //
        //////////////////////////////////////////////////////////////////////////////////
        var starField = new THREEx.DayNight.StarField()
        scene.add(starField.object3d)
        onRenderFcts.push(function(delta, now){
          starField.update(sunAngle)
        })
        //////////////////////////////////////////////////////////////////////////////////
        //    sunSphere             //
        //////////////////////////////////////////////////////////////////////////////////
        
        var sunSphere = new THREEx.DayNight.SunSphere()
        scene.add( sunSphere.object3d )
        onRenderFcts.push(function(delta, now){
          sunSphere.update(sunAngle)
        })

        //////////////////////////////////////////////////////////////////////////////////
        //    directionalLight            //
        //////////////////////////////////////////////////////////////////////////////////
              

        var sunLight  = new THREEx.DayNight.SunLight();
        scene.add( sunLight.object3d );
       // scene.add(new THREE.CameraHelper( sunLight.object3d.shadow.camera ));
        onRenderFcts.push(function(delta, now){
          sunLight.update(sunAngle)
        })

        //////////////////////////////////////////////////////////////////////////////////
        //    skydom                //
        //////////////////////////////////////////////////////////////////////////////////
        
        var skydom  = new THREEx.DayNight.Skydom()
        scene.add( skydom.object3d )
        onRenderFcts.push(function(delta, now){
          skydom.update(sunAngle)
        })
        //////////////////////////////////////////////////////////////////////////////////
        //    render the scene            //
        //////////////////////////////////////////////////////////////////////////////////
        onRenderFcts.push(function(){
          renderer.render( scene, camera );   
        })
    }

    var lastTimeMsec= null
    function animate() {
      requestAnimationFrame(function animate(nowMsec){
        // keep looping
        requestAnimationFrame( animate );
        // measure time
        lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
        var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec  = nowMsec
        // call each update function
        onRenderFcts.forEach(function(onRenderFct){
          onRenderFct(deltaMsec/1000, nowMsec/1000)
        })
      })
      render();
    }
    function render() {
      var delta = clock.getDelta();
      renderer.render( scene, camera );

    }

    $scope.goBack = function(){
      $rootScope.goto('/app/dashboard');
    }

})

;
