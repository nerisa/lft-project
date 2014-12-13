// JavaScript Document
function PieChart(id, properties) {
	this.originalData=properties.data;
	this.data=[];
	this.percentData=[];
	this.labels = properties.labels;
	this.colors = properties.colors;
	this.canvas = document.getElementById(id);
	this.margin=100;
	var that=this;
	
	this.init=function(){
		var sum=that.sumOfData(that.originalData);
		for (var i=0;i<that.originalData.length;i++){
			var angleData=that.originalData[i]*360/sum;
			var percentData=that.originalData[i]*100/sum;
			that.data.push(angleData);
			that.percentData.push(percentData.toFixed(2)+"%");
		}
		
		that.drawLegend();
		that.draw();
	}
	this.drawLegend=function(){
		var context=that.canvas.getContext("2d");
		for (var i=0;i<that.originalData.length;i++){
			context.fillStyle=that.colors[i];
			context.fillRect(that.canvas.width-that.margin,that.margin+i*25,20,20);
			context.fillStyle="#000";
			context.fillText(that.labels[i],that.canvas.width-that.margin+25,that.margin+i*25+10);
		}
	}
	this.draw=function(){
		var context = that.canvas.getContext("2d");
		for (var i = 0; i < that.data.length; i++) {
			that.drawSegment(that.canvas, context, i, this.data[i]);
		}
	}
	this.drawSegment=function(canvas,context,i,size){
		context.save();
		var centerX = Math.floor((canvas.width / 2)-that.margin);
		var centerY = Math.floor(canvas.height / 2);
		var radiusVar=Math.min(canvas.height,canvas.width);
		radius = Math.floor((radiusVar-2*that.margin) / 2);
		
		var startingAngle = that.degreesToRadians(that.sumTo(that.data, i));
		var arcSize = that.degreesToRadians(size);
		var endingAngle = startingAngle + arcSize;

		context.beginPath();
		context.moveTo(centerX, centerY);
		context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
		context.closePath();
		context.fillStyle = that.colors[i];
		context.fill();
		
		//context.stokeStyle="fff";
		//context.moveTo(centerX, centerY);
		//context.lineTo(startingAngle, endingAngle);
		//context.moveTo(centerX, centerY);
		context.restore();
		that.drawSegmentLabel(canvas, context, i);
	}
	
	this.drawSegmentLabel=function(canvas, context, i){
		context.save();
		var x = Math.floor((canvas.width/ 2) -that.margin);
		var y = Math.floor(canvas.height / 2);
		var angle;
		var angleD = that.sumTo(that.data, i);
		var flip = (angleD < 90 || angleD > 270) ? false : true;

		context.translate(x, y);
		if (flip) {
			angleD = angleD-180;
			context.textAlign = "left";
			angle = that.degreesToRadians(angleD);
			context.rotate(angle);
			context.translate(-(x + (canvas.width * 0.5))+15, -(canvas.height * 0.05)-10);
		}
		else {
			context.textAlign = "right";
			angle = that.degreesToRadians(angleD);
			context.rotate(angle);
		}
		
		var fontSize = Math.floor((canvas.height-2*that.margin) / 15);
		context.font = fontSize + "pt Arial";

		var dx = Math.floor((canvas.width-2*that.margin) * 0.5) - 10;
		var dy = Math.floor(canvas.height * 0.05);
		context.fillText(that.percentData[i], dx, dy);

		context.restore();
	}
		
	this.degreesToRadians=function(degrees) {
		return (degrees * Math.PI)/180;
	}

	this.sumTo=function(a, i) {
		var sum = 0;
		for (var j = 0; j < i; j++) {
			sum += a[j];
		}
		return sum;
	}
	this.sumOfData=function(data){
		var sum=0;
		for (var i=0;i<data.length;i++){
			sum+=data[i];
		}
		return sum;
	}


}


/*function createPieChart() {
	//
	// create a PieChart.
	// 
	var pieChart = new PieChart( "piechart", 
		{
			data: [40, 250, 70],
			labels: ["23%", "69.6%", "17.4%"],
			colors:["#FFDAB9","#E6E6FA", "#E0FFFF"]
		}
	);
pieChart.init();
}*/