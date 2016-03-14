(function(angular) {
    'use strict';

    angular.module('places.about', [
        'angular-meteor',
        'places.api'
    ])
        .controller('places.about.AboutCtrl', AboutCtrl);

    AboutCtrl.$inject = [];
    function AboutCtrl() {}


})(angular);