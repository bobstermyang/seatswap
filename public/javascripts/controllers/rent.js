(function(){

angular.module("seatSwap")
	.controller("RentSeatsController", ['$scope','$location','SeatsService','FlightService',function($scope,$location,SeatsService,FlightService) {
		$scope.firstClass = SeatsService.getSeats("firstClass");
		$scope.business = SeatsService.getSeats("business");
		$scope.economy = SeatsService.getSeats("economy");

		$scope.points = 13500;

		$scope.selectedNodes = [];

        $scope.doorOpen = "loading"; 

        FlightService.isDoorOpen().then(function(data){
            //$scope.doorOpen = data;
            $scope.doorOpen = false;
        });
        
        $scope.nodeSelected = function(node) {
            console.log('user selected ' + node.displayName);
            var isPresent = false, spliceIndex = -1;
            angular.forEach($scope.selectedNodes,function(nodeItem,index){
            	if(nodeItem.displayName==node)
            	{
            		spliceIndex = index;
            	}
            });
            if(spliceIndex==-1)
            {
            	$scope.selectedNodes.push(node);
            }
            else
            {
            	$scope.selectedNodes.splice(spliceIndex,-1);
            }
            $scope.selectedNode = node;
        };

        $scope.rent = function(){
        	var total = 0;
        	angular.forEach($scope.selectedNodes,function(nodeItem,index){
        		nodeItem.checked = false;
        		nodeItem.selected = true;
        		total = total + nodeItem.price;
        	});
        	SeatsService.paymentAmount = total;
            SeatsService.selecteNodes = $scope.selectedNodes;
        	$location.path('/checkout')
        }
	}]);
	
})();