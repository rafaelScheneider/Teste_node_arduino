const { SerialPort } = require('serialport')
var port = "COM3";
var http = require('http');
var fs = require('fs');


var serialPort = new SerialPort({
    path:port,
    baudRate: 9600,
})

serialPort.on("open", function() {
    console.log("-- Connection opened --");
    serialPort.on("data", function(data) {
        if (Object.keys(data).length != 1 && Object.keys(data).length != 2 && Object.keys(data).length != 3){
            console.log("" + data)
            mensagem = data;
        }
    });
});

http.createServer(function(req, res){
    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1>" + mensagem + "</h1>");
        res.end();
    });
}).listen(8000);
