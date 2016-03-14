(function(angular) {
    'use strict';

    angular.module('places.about', [
        'angular-meteor',
        'places.api'
    ])
        .controller('places.about.AboutCtrl', AboutCtrl);

    AboutCtrl.$inject = [
        '$scope',
        '$stateParams',
        'places.api.API',
        '$auth'
    ];
    function AboutCtrl($scope, $stateParams, API, $auth) {
        console.log(window.a = $auth);
        console.log($auth.getUserInfo());
    }


})(angular);