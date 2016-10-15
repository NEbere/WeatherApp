'use strict';

/**
 * @ngdoc function
 * @name weatherappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherappApp
 */
angular.module('weatherappApp')
  .controller('MainCtrl', function ($scope, $http, geolocation) {
    var vm = this;
    vm.url;
    $scope.searchResults;
    vm.appID = '015875585e5ac83b793835e137d645f7';
    vm.getURL = 'http://api.openweathermap.org/data/2.5/weather?';

    //by coordinates
    vm.getWeatherWithCoords = function() {
      geolocation.getLocation().then(function(data){
        $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
        vm.lat = $scope.coords.lat;
        vm.lng = $scope.coords.long;
        if(vm.lat === '' && vm.lng === ''){
          $scope.searchResults = false;
        } else{
          $scope.searchResults = true;
        }
        vm.url = vm.getURL + 'lat=' + vm.lat + '&lon=' + vm.lng;
        vm.getWeatherCall();
      });

    };
    vm.getWeatherWithCoords();
      // by country or zip code
      $scope.getWeather = function(countryorZip){
        var zipcode = /\d/;
        if(zipcode.test(countryorZip)){
          vm.countryorZip = countryorZip;
           vm.url = vm.getURL + "zip=" + vm.countryorZip ;
        }
        else{
          vm.countryorZip = countryorZip;
          vm.url = vm.getURL + "q=" + vm.countryorZip ;
        }
        vm.getWeatherCall();
      };

      vm.getWeatherCall = function(){
        $http.get(vm.url + "&appid=" + vm.appID + "&units=metric")
          .success(function(data){
             $scope.weatherDetails = data;
             $scope.imgSRC = "http://openweathermap.org/img/w/" + $scope.weatherDetails.weather[0].icon + ".png";
             $scope.temperature = $scope.weatherDetails.main.temp;
             $scope.description = $scope.weatherDetails.weather[0].description;
             $scope.pressure = $scope.weatherDetails.main.pressure;
             $scope.humidity = $scope.weatherDetails.main.humidity;
             $scope.lat = $scope.weatherDetails.coord.lat;
             $scope.lng = $scope.weatherDetails.coord.lon;
             $scope.windSpeed = $scope.weatherDetails.wind.speed;
          })
          .error(function(err){
            server.log(err);
          });
      };

  });
