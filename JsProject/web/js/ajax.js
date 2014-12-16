// JavaScript Document
function uploadImage(){
    var canvas=document.getElementById("chart");
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/SaveImage", false);
    var boundary = Math.random().toString().substr(2);
    xhr.setRequestHeader("content-type", 
    "multipart/form-data; charset=utf-8; boundary=" + boundary);
    var multipart = "--" + boundary + "\r\n" +
    "Content-Disposition: form-data; name=myImg\r\n" +
    "Content-type: image/png\r\n\r\n" +
    canvas.toDataURL("image/png") + "\r\n" +
    "--" + boundary + "--\r\n";
    xhr.send(multipart);
}