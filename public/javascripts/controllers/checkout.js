(function(){

angular.module("seatSwap")
	.controller("CheckoutController", ['$scope','$location','SeatsService',function($scope,$location,SeatsService) {
        $scope.amount = SeatsService.paymentAmount;
        $scope.selectedSeat = SeatsService.getSelectedSeats();
        if($scope.amount<=0)
        {
            $location.path('/');
        }
        braintree.setup(window.client_token, "dropin", {
          container: "payment-form"
        });

	}]);

})();