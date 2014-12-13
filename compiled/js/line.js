// JavaScript Document
function LineGraph(id,properties){
	this.canvas;
	this.context;
	this.type=properties.type;
	this.color=properties.colors?properties.colors:"rgb(51,102,255)";
	this.data=[];
	this.noOfLines;
	this.xLabel=properties.xLabel;
	this.maxVal;
	this.minVal;
	this.margin=40;
	this.yDivisions=10;
	this.xStep;
	this.yStep;
	this.yIncrement;
	this.newSize;
	this.snapShot;
	var that=this;
	
	this.findMax=function(){
		var max=[];
		for(var i=0;i<that.noOfLines;i++){
			for(var j=0;j<that.data[i].length;j++){
				max[i]=Math.max.apply(Math,that.data[i]);
			}
		}
		return(Math.max.apply(Math,max));
	}
	
	this.findMin=function(){
		var min=[];
		for(var i=0;i<that.noOfLines;i++){
			for(var j=0;j<that.data[i].length;j++){
				min[i]=Math.min.apply(Math,that.data[i]);
			}
		}
		return(Math.min.apply(Math,min));
	}
	
	this.init=function(){
		if (that.type[0]=="multiple"){
			that.noOfLines=that.type[1];
			for(var i=0;i<that.noOfLines;i++){
					that.data[i]=properties.data[i];
			}
		that.maxVal=that.findMax();
		that.minVal=that.findMin();
		console.log(that.minVal);	
		}
		
		else if(that.type[0]=="single"){
			that.noOfLines=1;
			that.data=properties.data;
			console.log(that.data);
			that.maxVal=Math.max.apply(Math,that.data);
			that.minVal=Math.min.apply(Math,that.data);
		}
			
		that.canvas=document.getElementById(id);
		that.context=that.canvas.getContext("2d");
		that.xStep=(that.canvas.width-2*that.margin)/(that.xLabel.length-1);
		that.yIncrement=Math.ceil((that.maxVal-that.minVal)/that.yDivisions);
		that.yStep=(that.canvas.height-2*that.margin)/that.yDivisions;
		that.drawAxes();
		that.drawGrid();
		that.writeLabels();
		that.context.save();
		that.context.translate(that.margin,that.canvas.height-that.margin);
		that.newSize=(that.yIncrement/that.yStep);
		that.context.lineWidth=that.newSize;
		that.context.scale(1,-1*(that.yStep/that.yIncrement));
		console.log(that.yStep/that.yIncrement);
		if(that.noOfLines>1){
			for(var i=0;i<that.noOfLines;i++){
				that.plotData(that.data[i],that.color[i]);
			}
		}
		else{
			that.plotData(that.data,that.color);
		}
		that.context.restore();
		window.addEventListener('mousedown', that.draw, false);
		window.addEventListener("mouseup",that.restoreCanvas,false);
		
	}
	this.drawAxes=function(){
		that.context.strokeStyle="rgb(0,0,0)";
		that.context.beginPath();
		that.context.moveTo(that.margin,that.margin);
		that.context.lineTo(that.margin,that.canvas.height-that.margin);
		that.context.lineTo(that.canvas.width-that.margin,that.canvas.height-that.margin);
		that.context.stroke();
	}
	this.drawGrid=function(){
		//vertical grids
		that.context.save();
		that.context.strokeStyle="rgb(204,204,204)";
		that.context.beginPath();
		for(var i=1;i<that.xLabel.length;i++){
			
			that.context.moveTo(that.margin+i*that.xStep,that.canvas.height-that.margin);
			that.context.lineTo(that.margin+i*that.xStep,that.margin);
			that.context.stroke();
		}
		
		//horizontal grids
		that.context.beginPath();
		for(var i=1;i<=that.yDivisions;i++){
			that.context.moveTo(that.margin,that.canvas.height-that.margin-i*that.yStep);
			that.context.lineTo(that.canvas.width-that.margin,that.canvas.height-that.margin-i*that.yStep);
			that.context.stroke();
		}
		
		that.context.restore();
	}
	this.writeLabels=function(){
		//x labels
		for(var i=0;i<that.xLabel.length;i++){
			that.context.fillText(that.xLabel[i],that.margin+i*that.xStep,that.canvas.height-(that.margin/2));
		}
		
		//y labels
		for(var i=0;i<=that.yDivisions;i++){
			var yLabel=that.minVal+i*that.yIncrement;
			that.context.fillText(yLabel,(that.margin/2),that.canvas.height-that.margin-i*that.yStep);
		}
	}
	this.plotData=function(data,color){
		that.context.strokeStyle=color;
		console.log(color);
		that.context.beginPath();
		that.context.moveTo(0, data[0]-that.minVal);
		that.context.arc(0, data[0]-that.minVal,2,0,2*Math.PI);
		for (i=1;i<data.length;i++) {
			that.context.arc(i * that.xStep, data[i]-that.minVal,2,0,2*Math.PI);
			that.context.lineTo(i * that.xStep,data[i]-that.minVal);
		}
		that.context.stroke();
	}
	
	this.getMousePos=function(canvas, evt) {
    	var rect = canvas.getBoundingClientRect();
    	return {
      		x: evt.clientX - rect.left,
      		y: evt.clientY - rect.top
    	};
	}
	this.draw=function(e){
    	var pos = that.getMousePos(that.canvas, e);
    	var posx = (pos.x-that.margin);
    	var posy = (that.canvas.height-that.margin-pos.y)*that.newSize;
		var graphPosX=(posx/that.xStep);
		var dataNo=Math.round(posx/that.xStep);
		var graphPosY=Math.round(posy);
		//var snapShot;
		//that.context.save();
		if( graphPosX>=(dataNo-0.3) && graphPosX<=(dataNo+0.3) && graphPosY<=(that.data[dataNo]+5) && graphPosY>=(that.data[dataNo]-5)){
			var text="(" + that.xLabel[dataNo] + "," + that.data[dataNo] + ")";
			var textPos={
							x:posx,
							y:graphPosY+(200*that.newSize)
			}
			
			that.snapShot=that.context.getImageData(0,0,that.canvas.width,that.canvas.height);
			that.context.fillText(text,textPos.x,textPos.y);
		}
		
	}
	this.restoreCanvas=function(){
		that.context.clearRect(0,0,that.canvas.width,that.canvas.height);
		that.context.putImageData(that.snapShot,0,0);
	}
	
}

/*var lineGraph=new LineGraph("linegraph",
							{
								type:["single",1],
								data:[100, 102, 87, 89, 100,200,5],
								xLabel:["2001", "2002","2003","2004","2005","2006","2007"],
							});
lineGraph.init();*/