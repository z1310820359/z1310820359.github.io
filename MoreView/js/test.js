var express = require('express');

var http = require('http');

var WebSocket = require('ws');
var app = express();
var url = require('url');
var server = http.createServer(app);

var wss = new WebSocket.Server({
    server
});

//保存socket
function UserSession() {
    this.users = {};
}

UserSession.prototype.remove = function (name) {
    delete users[name];
}

UserSession.prototype.setUserInfo = function (name, info) {
    this.users[name] = info;
}

UserSession.prototype.getUserInfo = function (name) {
    return this.users[name];
}

UserSession.prototype.sendMsg = function (name, msg) {
    var users = this.users;
    try {
        console.log(users[name])
        if (users[name].ws) {
            users[name].ws.send(JSON.stringify(msg));
            return;
        }
    } catch (error) {
        console.log(error);
    }

}

var usersession = new UserSession();

wss.on('connection', function (ws, req) {
    console.log('用户连接成功');
    //  console.log(req);
    const location = url.parse(req.url, true);
    console.log(location.search.split('?'));
    const identify = location.search.split('?')[1];

    usersession.setUserInfo(identify, {
        ws: ws,
        name: identify
    });
    console.log(usersession);

    //保存
    //消息监听
    ws.on('message', function (msg) {
        var data = JSON.parse(msg);
        //console.log(data);
        usersession.sendMsg(data.to, data);
       
    });

    ws.on('close', function () {
    });
});

server.listen(3002, function () {
    console.log('服务器开启：' + 3002);
})