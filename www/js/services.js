angular.module('eventos.services', [])

.factory('eventoService' , function() {
//POde se usar uma fonte aqui que retorne um array JSON

//Dados falsos para teste 
	var eventos = JSON.parse(localStorage.eventos || "[]");

function getNovoId() {
	return eventos.length ? eventos[eventos.length-1].id + 1 : 0;
}

function ItemController($ionicFilterBar) {  
    var vm = this,
        items = eventos,
        filterBarInstance;

    vm.items = items;

    showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: vm.items,
        update: function (filteredItems) {
          items = filteredItems;
        },
        filterProperties: 'description'
      });
    };

    return vm;
}

	return {
	  todos: function() {
	  	return eventos;
	  },
	  excluir: function(eventoIndex) {
	  		eventos.splice(eventoIndex, 1);
	  		localStorage.eventos = JSON.stringify(eventos);
	  },
	  salvar: function(evento) {
	  	evento.id = getNovoId();
	  	eventos.push({
	  		id: evento.id,
	  		nome: evento.nome,
	  		data: evento.data,
	  		local: evento.local,
	  		descricao: evento.descricao,
	  		foto: evento.foto
	  	});
	  	localStorage.eventos = JSON.stringify(eventos);		
	  },
	  get: function(eventoID) {
	  	for (var i = 0; i < eventos.length ; i++) {
	  		if (eventos[i].id == parseInt(eventoID)) {
	  			return eventos[i];
	  		  }
	  	    }
	  	    return null
	   }
	};
});