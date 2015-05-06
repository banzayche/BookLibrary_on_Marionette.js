/*global Backbone */
'use strict';

var routerController = myLibrarryApp.module('routerController', function(routerController, MyLibrarryApp, Backbone){
	// Добавим роутер
	routerController.GeneralRouter = Backbone.Marionette.AppRouter.extend({
		initialize: function(){
			MyLibrarryApp.GeneralCollection = new MyLibrarryApp.modelCollection.CollectionBook();
			MyLibrarryApp.GeneralCollection.fetch();
		},
		// будем обрабатывать все роуты и лишь потом вычислять, какие действия предпринимать
		appRoutes: {			
			'book/:id/edit': 'editBook',
			'book/:id/detail': 'detailBook',
			'book/create': 'editBook',
			'*route' : 'RouterProcessing',			
		},	
	});

	// Добавим контроллер
	routerController.GeneralController = Marionette.Controller.extend({
		// initialize: function(){
					
		// },
		
		editBook: function(id){			
			_.delay(function(){
				if( id == null ){
					var newModel = new MyLibrarryApp.modelCollection.Book({	id: id });
				} else{
					var newModel = MyLibrarryApp.GeneralCollection.get(id);
				}
				var coll = MyLibrarryApp.GeneralCollection;
				console.log(coll);
				console.log(id);
				console.log(newModel);
				var book = new MyLibrarryApp.staticViews.EditBookView({	
					model: newModel,
				});
				// Если модель новая id не будет - поля пустые
				// иначе в полях отобразятся значения модели
				MyLibrarryApp.root.showChildView('main', book);	
			}, 100);				
		},
		detailBook: function(id){
			var newModel = MyLibrarryApp.GeneralCollection.get(id);
			console.log(newModel)
			var book = new MyLibrarryApp.staticViews.DetailBookView({	
					model: newModel,
				});
			MyLibrarryApp.root.showChildView('main', book);	
		},

		RouterProcessing: function(route){
			console.log('I have working with '+route+' route');
			switch (route) {
				case "home":
					var there = this;
					_.delay(function(){
						there.showMain();
					}, 100);
					break;
				default:
			};			
		},

		showMain: function(){
			
			var mainView = new MyLibrarryApp.listViews.mainLayoutView({
				collection: MyLibrarryApp.GeneralCollection,
			});

			MyLibrarryApp.root.showChildView('main', mainView);
		},

	});
	
	$( document ).ready(function() {
    	var generalController = new routerController.GeneralController()
		var generalRouter = new routerController.GeneralRouter({
			controller: generalController,
		});
	});

	MyLibrarryApp.on('start', function(){
		console.log('book-application has been started');		
		
		// console.log(MyLibrarryApp.GeneralCollection);
	});
});