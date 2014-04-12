'use strict';

angular.module('CollaborativeMap')
  .directive('toolbox', ['$http',
    function($http) {
      return {
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'partials/toolbox',
        replace: true,

        link: function postLink($scope) {

          $scope.views = {
            userView: true,
            historyView: true,
            toolBarIn: true,
            settingsView: true,
            toolsView: true
          };

          $scope.toggleToolbar = function(view) {
            var vs = $scope.views;
            if (vs.toolBarIn) {
              vs.toolBarIn = false;
              vs[view] = false;
            } else if (!vs[view]) {
              hideAllViews();
            } else {
              hideAllViews();
              vs.toolBarIn = false;
              vs[view] = false;
            }
          };

          function hideAllViews() {
            var vs = $scope.views;
            for (var key in vs) {
              vs[key] = true;
            }
          }

          $scope.watchUsers = {};
          $scope.watchUser = function(userId) {
            if ($scope.watchUsers[userId]) {
              delete $scope.watchUsers[userId];
            } else {
              $scope.watchUsers[userId] = true;
            }
          };

          $scope.userBounds = {};

          $scope.getUserBounds = function(userId) {
            console.log(userId);
            var bounds = $scope.userBounds[userId];
            if (bounds) {
              var bound = L.rectangle(bounds, {
                color: '#ff0000',
                weight: 1,
                fill: false
              });
              bound.addTo($scope.map);
              $scope.map.fitBounds(bound, {
                'padding': [5, 5]
              });
              setTimeout(function() {
                $scope.map.removeLayer(bound);
              }, 3000);
            }
          };

          $scope.isWatchingAll = false;
          $scope.watchAll = function() {
            $scope.isWatchingAll = !$scope.isWatchingAll;
          };


          $scope.loadHistory = function() {
            console.log('load history');

            $http({
              method: 'GET',
              url: '/api/actions/'+ $scope.mapId
            })
              .
            success(function(data, status, headers, config) {
              console.log(data);
              // this callback will be called asynchronously
              // when the response is available
            })
              .
            error(function(data, status, headers, config) {
              console.log(data);
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });

          };
        }
      };
    }
  ]);
