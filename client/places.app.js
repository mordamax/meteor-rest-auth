(function(angular) {
    'use strict';

    angular.module('places.app', [
        'ui.router',
        'angular-meteor',
        'angular-meteor.auth',
        'angular-templates',
        'places.list',
        'places.auth',
        'places.about'
    ])
        .config(Config)
        .run(App)
    ;

    App.$inject = ['$rootScope', '$state', '$auth', '$http'];
    function App($rootScope, $state, $auth, $http) {
        $rootScope.$state = $state;
        $rootScope.$auth = $auth;

        $rootScope.logout = () => Accounts.logout(removeToken);

        Accounts.onLogin(() => {
            setToken();
            $state.go('places');
        });

        Meteor.autorun(setToken);

        function setToken() {
            var token = Accounts._storedLoginToken();
            if (token)
                $http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        function removeToken() {
            $state.reload();
            delete $http.defaults.headers.common['Authorization'];
        }
    }

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function Config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('about',         _getRouteParams('/about',  'client/about/places.about.html', 'places.about.AboutCtrl'))
            .state('auth',          _getRouteParams('/auth',   'client/auth/places.auth.html',   'places.auth.AuthCtrl', null, true))
            .state('auth.signup',   _getRouteParams('/signup', 'client/auth/places.auth.html',   'places.auth.AuthCtrl', 'auth'))
            .state('auth.signin',   _getRouteParams('/signin', 'client/auth/places.auth.html',   'places.auth.AuthCtrl', 'auth'))
            .state('auth.logout',   _getRouteParams('/logout', '',                               'places.auth.AuthCtrl', 'auth'))
            .state('places',        _getRouteParams('/',       'client/list/places.list.html',   'places.list.PlacesListCtrl'))
            .state('newPlace',      _getRouteParams('/new',    'client/list/places.new.html',    'places.list.PlacesNewCtrl'))
            .state('place',         _getRouteParams('/:id',    'client/list/places.one.html',    'places.list.PlacesListCtrl'))
        ;
    }

    /**
     *
     * @param {String} url
     * @param {String} template
     * @param {String|*} controller
     * @param {String} parent
     * @param {Boolean} isAbstract
     * @return {Object}
     * @private
     */
    function _getRouteParams(url, template, controller, parent, isAbstract) {
        var params = { url: url, templateUrl: template };
        if (controller) {
            params.controller = controller;
            params.controllerAs = 'vm';
        }
        if(parent) params.parent = parent;
        if(isAbstract) params.isAbstract = isAbstract;

        return params;
    }
})(angular);
