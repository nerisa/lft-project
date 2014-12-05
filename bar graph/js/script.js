// JavaScript Document
'use strict';
function BarGraph(id,properties){
	this.canvas=document.getElementById(id);
	this.data=properties.data;
	this.colors=properties.colors;
	this.label=properties.label;
	this.barWidth=10;
	this.barLength=50;
	var that=this;
	
	
	this.drawOneBar=function(context,canvas,data,barTop,barHeight){
		var x=barTop.x;
		var y=barTop.y;
		console.log(y,barHeight);
		context.save();
		context.fillStyle="#ff0000";
		context.fillRect(x,y,that.barWidth,barHeight);
		context.restore();
	}
	
	this.draw=function(){
		var context=that.canvas.getContext('2d');
		var graphLength=that.data.length*that.barLength;
		var graphHeight=350;
		context.beginPath();
		context.moveTo(10,10);
		context.lineTo(10,graphHeight);
		context.lineTo(graphLength,graphHeight);
		context.lineJoin='miter';
		context.stroke();
		
		var spaceBetweenBars=(that.barLength-that.barWidth)/2;
		var dataSum=that.sumOfData(that.data);
		var unitHeight=Math.floor(graphHeight/dataSum);
		
		for(var i=0;i<that.data.length;i++){
			var barHeight=that.data[i]*unitHeight;
			var barStart={
							x:(i*that.barLength+spaceBetweenBars),
							y:(graphHeight-barHeight)
						};
			
			//console.log(barStart.x,barStart.y);
			that.drawOneBar(context,that.canvas,that.data[i],barStart,barHeight);
		
		}
	}
	
	
	
	this.sumOfData=function(data){
		var sum=0;
		//console.log(data.length);
		for(var i=0;i<data.length;i++){
			//console.log(data[i]);
			sum+=data[i];
		}
		return sum;
	}
		
}

var barGraph=new BarGraph("bargraph",
						  {
							  data:[5,6,10,2,6,3,2],
							  colors:["#ff000000","#ff000000","#ff000000","#ff0000","#ff0000","#ff0000","#ff0000"],
							  label:["2005","2006","2007","2008","2006","2007","2008"]
						  }
						  );
barGraph.draw();
						  

	
	