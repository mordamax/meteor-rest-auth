(function(angular) {
    'use strict';

    angular.module('places.list', [
        'angular-meteor',
        'angular-templates',
        'places.api'
    ])
        .controller('places.list.PlacesListCtrl', PlacesListCtrl);

    PlacesListCtrl.$inject = [
        '$scope',
        '$state',
        '$reactive',
        '$stateParams',
        'places.api.API'
    ];
    function PlacesListCtrl(
        $scope,
        $state,
        $reactive,
        $stateParams,
        API
    ) {
        $reactive(this).attach($scope);
        this.helpers({
            places: () => API.places.get({id:$stateParams.id}, ()=>{}, (response) => {
                this.error = {
                    status: response.status,
                    data: response.data
                }
            })
        });
    }

})(angular);