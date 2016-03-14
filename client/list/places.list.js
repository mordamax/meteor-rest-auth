(function(angular) {
    'use strict';

    angular.module('places.list', [
        'angular-meteor',
        'angular-templates',
        'places.api'
    ])
        .controller('places.list.PlacesListCtrl', PlacesListCtrl)
        .controller('places.list.PlacesNewCtrl', PlacesNewCtrl)
    ;

    PlacesListCtrl.$inject = [
        '$scope',
        '$reactive',
        '$stateParams',
        'places.api.API'
    ];
    function PlacesListCtrl(
        $scope,
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

    PlacesNewCtrl.$inject = ['places.api.API', '$state'];
    function PlacesNewCtrl(API, $state) {
        this.place = {};
        this.createPlace = () => {
            API.places.save(this.place, (data) => {
                if (data && data.placeId) {
                    $state.go('place', {id: data.placeId});
                }
            }, (response) => {
                this.error = {
                    status: response.status,
                    data: response.data
                }
            })
        }
    }

})(angular);