var ws = require("nodejs-websocket");
console.log("开始建立连接...")

var chat1 = null,chat2 = null , chat1Ready = false , chat2Ready = false;
var server = ws.createServer(function(conn){
    conn.on("text", function (str) {
         
         console.log("收到的信息为:"+str)
        if(str==="A online1"){
            chat1 = conn;
            chat1Ready = true;
           // conn.sendText("success");
        }
        if(str==="B online2"){
            chat2 = conn;
            chat2Ready = true;
        }

        if(chat1Ready&&chat2Ready){
            var code=str.substr(-1,1)
            str=str.slice(0,-1)
            console.log(code)
            //判断最后一位状态码，分辨出是谁发的消息
            if(code==='1'){
                //A发来的消息
                chat1.sendText("--->A说 :"+str);
                chat2.sendText("--->A说 :"+str);
            }else{
                //B发来的消息
                chat1.sendText("--->B说 :"+str);
                chat2.sendText("--->B说 :"+str);
            }
           
        }
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
}).listen(8001)
console.log("WebSocket建立完毕")