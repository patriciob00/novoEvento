angular.module('eventos.controllers', [])

	.controller('EventosCtrl' , function($scope ,eventoService,$timeout, $ionicFilterBar) {
		var filterBarInstance;
		$scope.eventos = eventoService.todos();
		$scope.excluir = function(eventoIndex) {
			eventoService.excluir(eventoIndex);
		};

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
        		$scope.eventos = eventoService.todos();
        		$scope.$broadcast('scroll.refreshComplete');
      		}, 1000);		
     }})

	.controller( 'NovoEventoCtrl' , function($scope , eventoService ) {
		$scope.salvar = function(evento) {
			eventoService.salvar(evento);
		};
	})

	.controller( 'EventoDetalheCtrl' , function( $scope ,$stateParams, eventoService ) {
		$scope.evento = eventoService.get($stateParams.eventoID);
	});