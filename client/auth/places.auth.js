(function(angular) {
    'use strict';

    angular.module('places.auth', [
        'angular-meteor',
        'angular-meteor.auth',
        'angular-templates',
        'places.api'
    ])
        .controller('places.auth.AuthCtrl', AuthCtrl)
    ;


    AuthCtrl.$inject = [
        'places.api.API',
        '$state',
        '$auth'
    ];
    function AuthCtrl(
        API,
        $state,
        $auth
    ) {

        var user = $auth.getUserInfo();

        $auth.waitForUser(function() {
            $state.go('places')
        });


        this.$state = $state;
        if (user && user.currentUser) {
            $state.go('places');
        }

        this.signup = () => API.signup(this.user);
        this.signin = () => API.signin(this.user);
    }


})(angular);
