// JavaScript Document
var newChart=new Chart("chart","bargraph",
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
newChart.init();

/*var pieChart = new Chart( "chart", "piechart",
		{
			data: [40, 250, 70,45,67],
			labels: ["23%", "69.6%", "17.4%","bla","bla","bla"],
			colors:["#FFDAB9","#E6E6FA", "#E0FFFF","#ff0000","#00ff00","#0000ff"]
		}
	);
pieChart.init();*/

/*var lineGraph=new Chart("chart","linegraph",
							{
								type:["single",1],
								data:[100, 102, 87, 89, 100,200,5],
								xLabel:["2001", "2002","2003","2004","2005","2006","2007"],
							});
lineGraph.init();*/