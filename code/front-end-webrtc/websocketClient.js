/**Code examples borrowed from https://www.piesocket.com/blog/python-websocket */

/**Creates a WebSocket connection link */
const socket = new WebSocket('ws://tablebot.local:8000'); /*'ws://192.168.8.106:8000'); /*172.20.10.5:8000');*/

socket.addEventListener('open', function (event) {
  console.log('Connection Established');
});
 
/*This makes the browser log the messages received from the server*/
socket.addEventListener('message', function (event) {
  console.log(event.data);
  return false; /**might not be needed */
});
 
/**This function sends the data to the server over websocket*/
function sendDataToServer(data){
  socket.send(data);
}

/**For when the connection to the server is closed*/
socket.addEventListener('close', function (event) {
  console.log('Connection Closed');
});
