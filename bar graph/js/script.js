// JavaScript Document
'use strict';
function BarGraph(id,properties){
	this.type;
	this.canvas=document.getElementById(id);
	this.data=properties.data;
	this.multipleLabel=properties.multipleLabel;
	this.noOfData=properties.data.length;
	this.selfColors;
	this.colors;
	this.label=properties.label;
	this.labelX=properties.labelX;
	this.labelY=properties.labelY;
	this.barWidth
	this.margin=80;
	this.yStep;
	this.xStep;	this.yDivisions=10;
	this.yIncrement;
	this.graphHeight;
	this.graphLength;
	this.unitHeight;
	this.snapShot;
	var context=this.canvas.getContext('2d');
	var that=this;
	
	this.init=function(){
		if(properties.type=="multiple"){
			that.type="multiple";
		}
		else if(properties.type=="single"){
			that.type="single";
		}
		else{
			that.type="single";
		}
		
		if(properties.colors){
			that.colors=properties.colors;
			that.selfColors="true";
		}
		else{
			that.selfColors="false";
			if(properties.theme=="blue"){
				that.colors='rgba(0,51,255,0.5)';
				if(that.type=="multiple"){
					that.colors=['rgba(66,122,160,0.8)','rgba(166,211,241,0.8)'];
				}
			}
			else if(properties.theme=="red"){
				that.colors='rgba(153,0,0,0.8)';
				if(that.type=="multiple"){
					that.colors=['rgba(102,0,0,0.8)','rgba(204,51,51,0.8)'];
				}
			}
			else{
				that.colors='rgba(102,102,102,0.5)';
			}
		}
				
			
		that.graphLength=that.canvas.width-2*that.margin;
		that.xStep=that.graphLength/that.data.length;
		console.log(that.xStep);
		that.graphHeight=that.canvas.height-2*that.margin;
		var maxVal,minVal;
		if(that.type=="single"){
			maxVal=Math.max.apply(Math,that.data);
			minVal=Math.min.apply(Math,that.data);
			that.barWidth=that.xStep/2;
		}
		else if(that.type=="multiple"){
			maxVal=that.findMax();
			minVal=that.findMin();
			that.barWidth=that.xStep/4;
		}
		console.log(maxVal,minVal);
		that.yStep=that.graphHeight/that.yDivisions;
		that.yIncrement=Math.ceil((maxVal-minVal)/that.yDivisions);
		
		console.log(that.barWidth);
		that.drawAxes();
		that.drawGrid();
		that.writeAxes();
		//var fontSize=Math.floor(that.newScale);
			
		context.save();
		if(that.type=="single"){
			that.draw();
			context.restore();
			window.addEventListener('mousedown', that.enableData, false);
			window.addEventListener("mouseup",that.disableData,false);
		}
		else if(that.type=="multiple"){
			that.drawMultiple();
			console.log(that.type);
			context.restore();
		}
	}
		
	this.drawOneBar=function(barTop,barHeight,color){
		var x=barTop.x;
		var y=barTop.y;
		//console.log(y,barHeight);
		context.save();
		context.fillStyle=color;
		context.fillRect(x,y,that.barWidth,barHeight);
		context.restore();
	}
	this.drawMultiple=function(){
		context.translate(that.margin,that.canvas.height-that.margin);
		var newScale=that.yStep/that.yIncrement;
		context.scale(1,-1*newScale);
		for (var i=0;i<that.data.length;i++){
			var barPos=that.xStep/4+i*that.xStep
			for(var j=0;j<that.data[i].length;j++){
				var barHeight=that.data[i][j];
				var barStart={
								x:barPos+j*that.xStep/4,
								y:0
				}
				that.drawOneBar(barStart,barHeight,that.colors[j]);
				//var text="("+that.label[i]+","+that.data[i][j]+")";
				//context.fillText(text,barStart.x,barHeight,that.xStep/4);
			}
		}
	}
	
	this.draw=function(){
		context.translate(that.margin,that.canvas.height-that.margin);
		var newScale=that.yStep/that.yIncrement;
		context.scale(1,-1*newScale);
		for(var i=0;i<that.data.length;i++){
			var barHeight=that.data[i];
			var barStart={
							x:that.xStep/4+i*that.xStep,
							y:0
						};
			if(that.selfColors=="true"){
				that.drawOneBar(barStart,barHeight,that.colors[i]);
			}
			else{
				that.drawOneBar(barStart,barHeight,that.colors);
			}
		}
		
	}
	this.drawAxes=function(){
		context.strokeStyle="#000000";
		context.beginPath();
		context.moveTo(that.margin,that.margin);
		context.lineTo(that.margin,that.canvas.height-that.margin);
		context.lineTo(that.canvas.width-that.margin,that.canvas.height-that.margin);
		context.lineJoin='miter';
		context.stroke();
		if (that.type=="multiple"){
			context.fillStyle=that.colors[0];
			context.fillRect(that.canvas.width-that.margin,that.margin,15,15);
			context.fillText(that.multipleLabel[0],that.canvas.width-that.margin+15,that.margin+15);
			context.fillStyle=that.colors[1];
			context.fillText(that.multipleLabel[1],that.canvas.width-that.margin+15,that.margin+35);
			context.fillRect(that.canvas.width-that.margin,that.margin+20,15,15);
		}
	}
	
	this.drawGrid=function(){
		//horizontal grids
		context.strokeStyle="#cccccc";
		context.fillStyle="#000";
		context.beginPath();
		for(var i=1;i<=that.yDivisions;i++){
			var y=that.canvas.height-that.margin-i*that.yStep;
			context.moveTo(that.margin,y);
			context.lineTo(that.canvas.width-that.margin,y);
			var scale=i*that.yIncrement;
			context.fillText(scale,that.margin/2,y);
		}
		context.stroke();
		
		//x divisions
		context.strokeStyle="#000000";
		context.beginPath();
		var x;
		for(var i=1;i<that.data.length;i++){
			x=that.margin+i*that.xStep;
			context.moveTo(x,that.canvas.height-that.margin);
			context.lineTo(x,that.canvas.height-that.margin+10);
			var textPos=x-that.xStep/2-that.label[i-1].length/2
			context.fillText(that.label[i-1],textPos,that.canvas.height-that.margin+10,50);
		}
		context.stroke();
		var textPos=x+that.xStep/2-that.label[that.data.length-1].length/2
		context.fillText(that.label[that.data.length-1],textPos,that.canvas.height-that.margin+10,50);
	}
	
	
	this.writeAxes=function(){
		var fontSize=Math.floor(that.canvas.height/40);
		context.font=fontSize+"pt Helvetica";
		context.fillStyle="#000000"
		var xPos={
					x:that.margin+that.graphLength/2-that.labelX.length/2,
					y:that.canvas.height-that.margin/4
		}
		
		context.fillText(that.labelX,xPos.x,xPos.y);
		
		context.save();
		context.translate(Math.ceil(that.margin/3),that.canvas.height/2+that.labelY.length)
		context.rotate(Math.PI * -90/180);
		context.fillText(that.labelY,0,0);
		context.restore();
	}
	
	this.getMousePos=function(canvas, evt) {
    	var rect = canvas.getBoundingClientRect();
    	return {
      		x: evt.clientX - rect.left,
      		y: evt.clientY - rect.top
    	};
	}
	
	this.enableData=function(e){
    	var pos = that.getMousePos(that.canvas, e);
    	var posx = (pos.x-that.margin);
    	var posy = (that.canvas.height-that.margin-pos.y)/that.newScale;
		var graphPosX=(posx/that.xStep);
		var dataNo=Math.floor(posx/that.xStep);
		console.log(dataNo);
		var graphPosY=Math.round(posy);
		var text="(" + that.label[dataNo] + "," + that.data[dataNo] + ")";
		var textPos={
							x:posx,
							y:pos.y
					}
		that.snapShot=context.getImageData(0,0,that.canvas.width,that.canvas.height);
		context.fillStyle="#000000"
		var fontSize=Math.floor(that.canvas.height/30);
		context.font=fontSize+"pt Helvetica";
		console.log(text);
		context.fillText(text,textPos.x,textPos.y);
		}
		
	
	this.disableData=function(){
		context.clearRect(0,0,that.canvas.width,that.canvas.height);
		context.putImageData(that.snapShot,0,0);
	}
	
	this.findMax=function(){
		var max=[];
		for(var i=0;i<that.noOfData;i++){
			for(var j=0;j<that.data[i].length;j++){
				max[i]=Math.max.apply(Math,that.data[i]);
			}
		}
		return(Math.max.apply(Math,max));
	}
	
	this.findMin=function(){
		var min=[];
		for(var i=0;i<that.noOfData;i++){
			for(var j=0;j<that.data[i].length;j++){
				min[i]=Math.min.apply(Math,that.data[i]);
			}
		}
		return(Math.min.apply(Math,min));
	}
	
}

var barGraph=new BarGraph("bargraph",
						  {
							   data:[[5,6],[12,10],[13,2],[8,4],[5,6],[4,6],[7,8]],
							  theme:"blue",
							  type:"multiple",
							  multipleLabel:["male","female"],
					
							 // colors:["#ff0045","#ff6700","#fffb00","#ff0230","#ff0080","#ffbb00","#ff0aa0"],
							  label:["2005","2006","2007","2008","2006","2007","2008"],
							  labelX:"Years",
							  labelY:"No. of persons"
						  }
						  );
barGraph.init();
						  

	
	