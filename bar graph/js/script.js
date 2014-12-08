// JavaScript Document
'use strict';
function BarGraph(id,properties){
	this.canvas=document.getElementById(id);
	this.data=properties.data;
	this.colors=properties.colors;
	this.label=properties.label;
	this.labelX=properties.labelX;
	this.labelY=properties.labelY;
	this.barWidth=30;
	this.barLength=40;
	var that=this;
		
	this.drawOneBar=function(context,data,barTop,barHeight,color){
		var x=barTop.x;
		var y=barTop.y;
		//console.log(y,barHeight);
		context.save();
		context.fillStyle=color;
		context.fillRect(x,y,that.barWidth,barHeight);
		context.restore();
	}
	
	this.draw=function(){
		var context=that.canvas.getContext('2d');
		var graphLength=that.data.length*that.barLength;
		var canvasWidth=graphLength+100;
		that.canvas.width=canvasWidth;
	
		var unitHeight=10;
		var graphHeight=(Math.max.apply(Math,that.data))*unitHeight;
		var canvasHeight=graphHeight+100;
		console.log(canvasHeight);
		that.canvas.height=canvasHeight;
		console.log(graphHeight);
		var startX=40;
		var startY=50;
		
		
		//draw graph axes
		context.beginPath();
		context.moveTo(startX,startY);
		context.lineTo(startX,startY+graphHeight);
		context.lineTo(graphLength,startY+graphHeight);
		context.lineJoin='miter';
		context.stroke();
		
		//var spaceBetweenBars=40;
		var dataSum=that.sumOfData(that.data);
		//var unitHeight=Math.floor(graphHeight/dataSum);
		
		
		for(var i=0;i<that.data.length;i++){
			var barHeight=that.data[i]*unitHeight;
			var barStart={
							x:(startX+(i*that.barWidth)+i),
							y:startY+(graphHeight-barHeight)
						};
			console.log(barStart.y);
			var labelPos={
							x:barStart.x,
							y:startY+graphHeight+10
						};
			var dataPos={
							x:barStart.x+5,
							y:barStart.y
						};
			var xAxes={
							x:((startX+graphLength)/2)-50,
							y:labelPos.y+10
						};
			
			//console.log(barStart.x,barStart.y);
			that.drawOneBar(context,that.data[i],barStart,barHeight,that.colors[i]);
			that.writeLabels(context,that.label[i],that.data[i],labelPos,dataPos);
		
		}
		that.writeAxes(context,xAxes,30);
		
	}
	
	this.writeLabels=function(context,label,data,labelPos,dataPos){
		context.save();
		context.textAlign="left";
		context.fillStyle="#000";
		context.fillText(label,labelPos.x,labelPos.y,200);
		
		context.textAlign="centre";
	
		context.fillText(data,dataPos.x,dataPos.y,200);
		context.restore();
	}
	
	this.writeAxes=function(context,xPos,yPos){
		context.save();
		context.fillStyle="#F00"
		context.fillText(that.labelX,xPos.x,xPos.y);
		
		context.rotate(Math.PI);
		context.fillText("hello",100,0,200);
		context.restore();
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
							  colors:["#ff0045","#ff6700","#fffb00","#ff0230","#ff0080","#ffbb00","#ff0aa0"],
							  label:["2005","2006","2007","2008","2006","2007","2008"],
							  labelX:"Years",
							  labelY:"No. of persons"
						  }
						  );
barGraph.draw();
						  

	
	