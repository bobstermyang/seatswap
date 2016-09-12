(function(){

angular.module("seatSwap")
	.controller("BuySeatsController", ['$scope','$location','SeatsService','FlightService',function($scope,$location,SeatsService,FlightService) {
		$scope.firstClass = SeatsService.getSeats("firstClass");
		$scope.business = SeatsService.getSeats("business");
		$scope.economy = SeatsService.getSeats("economy");

        $scope.totalAvailable = SeatsService.getAvailable($scope.firstClass)
                                +SeatsService.getAvailable($scope.business)
                                +SeatsService.getAvailable($scope.economy);

		$scope.points = 12500;

		$scope.selectedNode = {};
        
        $scope.doorOpen = "loading"; 

        FlightService.isDoorOpen().then(function(data){
            //$scope.doorOpen = data;
            $scope.doorOpen = false;
        });

        var deSelectNodes = function(data,selected){
            angular.forEach(data.rows,function(row){
                if(angular.isObject(row)&&angular.isArray(row.nodes))
                {
                    angular.forEach(row.nodes,function(node){
                        if(node.displayName!=selected.displayName){
                            node.checked = false;
                        }
                        if(node.selected!=1&&node.type==1)
                        {
                            $scope.totalAvailable = $scope.totalAvailable + 1;
                        }
                    })
                }
            })
        }
        $scope.nodeSelected = function(node) {
            console.log('user selected ' + node.displayName);
            $scope.totalAvailable = 0;
            deSelectNodes($scope.firstClass,node);
            deSelectNodes($scope.business,node);
            deSelectNodes($scope.economy,node);
            $scope.selectedNode = node;
        };

        $scope.purchase = function(){
        	$scope.selectedNode.checked = false;
        	$scope.selectedNode.selected = true;
        	SeatsService.paymentAmount = $scope.selectedNode.price;
            SeatsService.selecteNodes=[$scope.selectedNode];
        	$location.path('/checkout')
        }

	}]);

})();