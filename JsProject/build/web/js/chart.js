// JavaScript Document
function Chart(id,type,data){
	this.id=id;
	this.data=data;
	this.type=type;
	var that=this;
	
	this.init=function(){
		if (that.type=="bargraph"){
			var barGraph=new BarGraph(id,data);
			barGraph.init();
		}
		else if(that.type=="linegraph"){
			var lineGraph=new LineGraph(id,data);
			lineGraph.init();
		}
		else if(that.type=="piechart"){
			var pieChart=new PieChart(id,data);
			pieChart.init();
		}
		else{
			console.log("error in data");
		}
	}
}