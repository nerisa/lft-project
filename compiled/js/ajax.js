// JavaScript Document
function uploadImage(){
	var testCanvas = document.getElementById("chart");
	var canvasData = testCanvas.toDataURL("image/png");
	var ajax = new XMLHttpRequest();
	ajax.open("POST",'testSave.php',true);
	ajax.setRequestHeader('Content-Type', 'application/upload');
	ajax.send(canvasData );
}