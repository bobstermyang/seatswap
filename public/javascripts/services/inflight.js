(function(){

InFlight.initService(["flightdata/v2"], function(FlightData){
    window.FlightData = FlightData;
}, function(){
    console.log("Couldn't load inflight services")
});

angular.module("seatSwap")
	.service('FlightService',['$q',function($q){
		this.isDoorOpen = function(){
			var deferred = $q.defer();
			FlightData.doorsClosed(function(err, doors) {
				console.log(doors)
			    if (err) {
			        console.log(err.text);
			    }
			    deferred.resolve(doors);
			});
			return deferred.promise;
		}
	}])
})();