/**
 * Created by Slaby on 08.12.2015.
 */
/**
 * http://socket.io/docs/server-api/
 */


/**
 *  Modul socket.io do komunikacji po TCP
 * @type {{}}
 */
var socketIo = {};
/**
 * @description
 * @param httpServer Instancja servera HTTP
 */
socketIo.init = function (httpServer) {
    socketIo.io = require("socket.io")(httpServer);
    socketIo.io.on('connection', function (socket) {
        socket.emit('news', {hello: 'world'});
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
};

module.exports = socketIo;