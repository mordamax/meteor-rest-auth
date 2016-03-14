(function(angular) {
    'use strict';

    angular.module('places.api', ['ngResource'])
        .service('places.api.API', API);

    API.$inject = ['$resource', '$http', '$state'];
    function API ($resource, $http, $state) {

        let saveToken = (data) => {
            Accounts.loginWithToken(data.token);
        };

        return {
            places: $resource('/api/places/:id'),
            signin: (params) => $resource('/users/login').save(params, saveToken),
            signup: (params) => $resource('/users/register').save(params, saveToken)
        };
    }

})(angular);