(function(){

var app = angular.module("seatSwap", ['ngRoute'])
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	      .when('/',{
	          templateUrl: '/javascripts/views/buy.tpl.html',
	          controller: 'BuySeatsController'
	      })
	      .when('/rent',{
	          templateUrl: '/javascripts/views/rent.tpl.html',
	          controller: 'RentSeatsController'
	      })
	      .when('/checkout',{
	          templateUrl: '/javascripts/views/checkout.tpl.html',
	          controller: 'CheckoutController'
	      })
	      .otherwise({ 
	        redirectTo: '/'
	      });
}]);
	
$.get('/client_token',function(data){
	window.client_token = data;
})
})();