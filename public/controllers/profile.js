/*-- RK ANFANG --*/
angular.module('MyApp')
    .controller('ProfileCtrl', function($scope, $http, $alert) {
        var imi, thesis, lastMinute, course, roostimi, roostthesis, roostlastMinute, roostcourse;
      $http.get('api/users/' + $scope.currentUser._id).success(function(response){
          //console.log(response);
          $scope.notifications = [{
              name: 'lastMinute',
              value: response.lastMinute
          }, {
              name: 'thesis',
              value: response.thesis
          }, {
              name: 'imi',
              value: response.imi
          }, {
              name: 'course',
              value: response.course
          }];

          thesis = response.thesis;
          imi = response.imi;
          lastMinute = response.lastMinute;
          course = response.course;


          $scope.callRoost = function() {
              //console.log(_roost);
              if (_roost) {
                  console.log('Roost found: ' + JSON.stringify(_roost));
              } else {
                  console.log('Roost not found');
              }

              if (imi == true){
                  roostimi = "imi";
              }else roostimi = "";

              if (thesis == true){
                  roostthesis = "thesis";
              }else roostthesis = "";

              if (lastMinute == true){
                  roostlastMinute = "lastMinute";
              }else roostlastMinute = "";

              if (course == true){
                  roostcourse = "course";
              }else roostcourse = "";




              _roost.prompt();
              _roost.push(["segments", roostimi, roostlastMinute, roostthesis, roostcourse]);
          };



      });
        $http.get('api/users/' + $scope.currentUser._id).error(function(response){});
        $scope.notificationsCopy = [];

        $scope.saveChanges = function() {
            //console.log($scope.currentUser);
            $scope.notificationsCopy = angular.copy($scope.notifications);

            $http.put('api/users/' + $scope.currentUser._id, $scope.notifications).success(function(){
                $alert({
                    title: 'Safed!',
                    content: 'Notifications have been updated.',
                    animation: 'fadeZoomFadeDown',
                    type: 'material',
                    duration: 3
                });

            });


        };
     });
/*-- RK ENDE --*/