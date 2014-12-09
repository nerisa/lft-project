// JavaScript Document
function LineGraph(id,properties){
	this.canvas;
	this.context;
	this.data=properties.data;
	this.xLabel=properties.xLabel;
	this.maxVal;
	this.minVal;
	this.margin=40;
	this.yDivisions=10;
	this.xStep;
	this.yStep;
	this.yIncrement;
	var that=this;
	
	
	this.init=function(){
		that.canvas=document.getElementById(id);
		that.context=that.canvas.getContext("2d");
		that.maxVal=Math.max.apply(Math,that.data);
		that.minVal=Math.min.apply(Math,that.data);
		that.xStep=(that.canvas.width-2*that.margin)/(that.xLabel.length-1);
		that.yIncrement=Math.ceil((that.maxVal-that.minVal)/that.yDivisions);
		that.yStep=(that.canvas.height-2*that.margin)/that.yDivisions;
		that.drawAxes();
		that.drawGrid();
		that.writeLabels();
		that.context.save();
		that.context.translate(that.margin,that.canvas.height-that.margin);
		that.newSize=(that.yIncrement/that.yStep)*2;
		that.context.lineWidth=that.newSize;
		that.context.scale(1,-1*(that.yStep/that.yIncrement));
		console.log(that.yStep/that.yIncrement);
		that.plotData();
		that.context.restore();
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
		for(var i=0;i<that.yDivisions;i++){
			var yLabel=that.minVal+i*that.yIncrement;
			that.context.fillText(yLabel,(that.margin/2),that.canvas.height-that.margin-i*that.yStep);
		}
	}
	this.plotData=function(){
		that.context.beginPath();
		that.context.moveTo(0, that.data[0]-that.minVal);
		for (i=1;i<that.data.length;i++) {
			that.context.lineTo(i * that.xStep,that.data[i]-that.minVal);
		}
		that.context.stroke();
	}
}

var lineGraph=new LineGraph("linegraph",
							{
								data:[100, 102, 87, 89, 100,200,5],
								xLabel:["2001", "2002","2003","2004","2005","2006","2007"],
							});
lineGraph.init();