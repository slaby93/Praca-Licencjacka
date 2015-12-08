/**
 * Created by Slaby on 08.12.2015.
 */
angular.module("mainApp")
    .service("socketService", ["$http", socketService]);
/**
 * http://socket.io/docs/client-api/
 */
function socketService($http) {
    var socket = null;

    /**
     * Starts socket service
     */
    this.init = function () {
        /**
         * Inicjalizuje polaczenie z serverem
         */
        socket = io();
        defineListeners();
    };

    function defineListeners() {
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', {my: 'data'});
        });
    }
}