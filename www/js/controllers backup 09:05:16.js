angular.module('starter.controllers', ['ngFlowGrid'])

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout,$http,$state,$window) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.users = {};

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
  };
  $scope.logout = function(){
    $window.localStorage.clear();
    $rootScope.goto("/login");
  };
/*
  if(typeof $scope.username == "undefined"){
    $rootScope.goto("/login");
  }else{
    $rootScope.goto("/app/dashboard");
  }*/
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


.controller('3DCtrl',function($scope,$timeout, $ionicLoading){
  $scope.create = function(){
    var onRenderFcts= [];
    var stats;
    $scope.haha = function(){
      alert("haha");
    }
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
    var light = new THREE.SpotLight(0xffffff,1.0);
    light.position.y = 300;
    scene.add(light);
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
      // ground.position.y = -10;
      scene.add(ground);
      ground.receiveShadow = true;
    }
    //resize
    THREEx.WindowResize(renderer, camera);

  var manager = new THREE.LoadingManager();
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
    scene.add(mesh);
};

    //add house
    document.getElementById("progress").setAttribute("style","display:block;");
    document.getElementById( "progress" ).style.display = "block";
    loadRoom();
    //add ground
  //  $scope.addGround();
    //add daylight
  //  daylightMode();

    //--------
    var clock = new THREE.Clock();
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0, 0 );
    controls.update(); 
         stats = new Stats();
        stats.showPanel( 1);
        container.appendChild( stats.dom );         
    animate();
     function loadRoom(){
               var loader = new THREE.BinaryLoader();
                   // loader.load("models/3D_Room_test/room.js",function(geometry,materials){
                    loader.load("models/building_clear/building_binary.js",function(geometry,materials){
                        var faceMaterial = new THREE.MultiMaterial( materials );
                        var object = new THREE.Mesh(geometry,faceMaterial);
                        mesh = object;
                        mesh.scale.set(1,1,1);
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;
                }); 
      }

 /*          function loadRoom(){
              var mtlLoader = new THREE.MTLLoader();
              mtlLoader.setBaseUrl( 'models/3D_Room_test/' );
              mtlLoader.setPath( 'models/3D_Room_test/' );
              mtlLoader.load( 'room_blender.mtl', function( materials ) {
                    materials.preload();
                    var objLoader = new THREE.OBJLoader();
                    objLoader.setMaterials( materials );
                    objLoader.setPath( 'models/3D_Room_test/' );
                    objLoader.load( 'room_blender.obj', function ( object ) {
                      mesh = object;
                      //scene.add( mesh );
                    });
              });
            }
       */    
            
 /*           function loadRoom(){
              var loader = new THREE.OBJLoader( manager );
              loader.load( 'obj/male02/male02.obj', function ( object ) {
                object.traverse( function ( child ) {
                  if ( child instanceof THREE.Mesh ) {
                    child.material.map = texture;
                  }
                } );
                object.position.y = - 95;
                scene.add( object );
              }, onProgress, onError );
            }
            */
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

    var lastTimeMsec= null;
    function animate() {


    /*  requestAnimationFrame(function animate(nowMsec){
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
      })  */
        requestAnimationFrame(animate); 
        render();
        stats.update();

    }
    function render() {
      var delta = clock.getDelta();
      renderer.render( scene, camera );
    }
  }
    // Setup the loader
  /*$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });*/
  $scope.create();

  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
  /*$timeout(function () {
    $ionicLoading.hide();
  }, 2000);*/
})

;
