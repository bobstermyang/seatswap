(function(){

var generateRow = function(rowConfig){
	var rows = [];
	for(var rowIndex in rowConfig.names){
		var rowName = rowConfig.names[rowIndex];
		rows.push({
			"rowname":rowName,
			"nodes":generateNodes(rowName,rowConfig)
		})
	}
	return rows;
}
var generateNodes = function(rowName,rowConfig){
	var nodes = [];
	var seatIndex = 0;
	for(var index = 1 ; index < rowConfig.perRow;index++)
	{
		var seatData = {
			'type':rowConfig.seatConfig.indexOf(index)!=-1?0:1,  // to add space set value 0
			'displayName':rowName+String.fromCharCode(97 + seatIndex).toUpperCase(),
			'price':rowConfig.price,
			'selected':parseInt(Math.random(2)*10)%2,
			'checked':false,
			'class':rowConfig.class
		};
		if(rowConfig.seatConfig.indexOf(index)==-1){
			seatIndex++;
		}
		nodes.push(seatData)
	}
	return nodes;
}
angular.module("seatSwap")
	.service('SeatsService',[function(){
		this.seats = {};
		this.paymentAmount = 0;
		this.selecteNodes = [];
		var rowConfig = {
			"firstClass":{
				'names':["1","2","3"],
				'seatConfig':[2],
				'perRow':4,
				'price':300,
				'class':"First Class"
			},
			"business":{
				'names':["4","5","6","7"],
				'perRow':6,
				'seatConfig':[3],
				'price':150,
				'class':"Business Class"
			},
			"economy":{
				'names':["8","9","10","11","12","13"],
				'perRow':8,
				'seatConfig':[4],
				'price':50,
				'class':"Economy Class"
			}
		};
		this.getSeats = function(type){
			if(angular.isDefined(rowConfig[type])) {
				if(!angular.isDefined(this.seats[type]))
				{
					this.seats[type] =	{
						'rows':generateRow(rowConfig[type]),
						'config':rowConfig[type]
					}
				}
				return this.seats[type];
			}
			else
			{
				return { 
					'row':[]
				}
			}
		}
		this.getSelectedSeats = function(){
			var seatNames = [];
			angular.forEach(this.selecteNodes,function(node){
				seatNames.push(node.displayName);
			})
			return seatNames.toString();
		}

		this.getAvailable = function(data){
			var total = 0;
			angular.forEach(data.rows,function(rows){
				angular.forEach(rows.nodes,function(node){
					if(!node.selected!=1&&node.type==1)
					{
						total++;
					}
				})
			})
			return total;
		}
	}])
})();