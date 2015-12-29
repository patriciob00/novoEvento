  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  angular.module('eventos2', ['ionic','eventos.controllers', 'eventos.services','jett.ionic.filter.bar'])

  .config( function($httpProvider, $stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider) {
  //Ionic usa AngularUI Router que usa o conceito de states(estados)
  //Configure os varios states que o app pode ter
  //Cada controller do state pode ser achado no arquivo controller.js
  $stateProvider

  //configure um state abstrato para as directives da tab
   .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
    })

  //Cada tab tem sua propria nav history pilha:

  .state('tab.eventos',{
    url: '/eventos',
    views: {
     'tab-eventos': {
       templateUrl: 'templates/tab-eventos.html',
       controller: 'EventosCtrl'
      }
    }
  })

  .state('tab.novo', {
    url: '/novo-evento',
    views: {
      'novo-evento': {
        templateUrl: 'templates/novo-evento.html',
        controller: 'NovoEventoCtrl'
      }
    }
  })

  .state( 'tab.eventoDetalhe',{
    url: '/eventos/:eventoID',
    views: {
      'tab-eventos': {
        templateUrl: 'templates/evento-detalhe.html',
        controller: 'EventoDetalheCtrl'
      }  
    }
  });

    // Se caso nenhum dos states for reconhecido , esse state será carregado como default
    $urlRouterProvider.otherwise('/tab/eventos');

})

  .run(function($ionicPlatform , eventoService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
  });
  var eventos = localStorage.eventos;
    if (!eventos) {
        localStorage.eventos =  JSON.stringify(eventoService.todos())
    }
  })

    .controller('MainController', function($scope, $timeout, $ionicFilterBar) {

    var filterBarInstance;

    function getItems () {
      var items = localStorage.eventos;     
      $scope.items = items;
    }
    getItems();

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.eventos,
        update: function (filteredItems, filterText) {
          $scope.eventos = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };

    $scope.refreshItems = function () {
      if (filterBarInstance) {
        filterBarInstance();
        filterBarInstance = null;
      }

      $timeout(function () {
        getItems();
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };
  })

   