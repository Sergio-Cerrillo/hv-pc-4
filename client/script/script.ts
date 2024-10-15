import {io} from "socket.io-client"

//first page
var entry = document.getElementById('enter-chat');

    if(entry){
        entry.addEventListener('click', function () {
            window.location.href = 'post-index.html';
        });
    }

//--------------------------------------------------------------------------------------
//second page
// Declare shocket
const socket = io("http://localhost:3000", {
    auth: {
      serverOffset: 0
    } 
  });
  
//show messages on chat
socket.on('chat message', (msg, serverOffset) => {
  const item = `<li>${msg}</li>`;
  messages!.insertAdjacentHTML('beforeend', item);

  // Move on the messages
  messages!.scrollTop = messages!.scrollHeight;
});  

const form = document.getElementById('form');
const input = document.getElementById('input') as HTMLInputElement;
const messages = document.getElementById('messages');

// button to clean chat
var delete1=document.getElementById('delete-button');
if(delete1){
delete1.addEventListener('click', () => {
    socket.emit('vaciar tabla');
    const items = document.querySelectorAll('li');
    if (items.length === 0) {
        console.log('El chat ya está vacío.');
    }
    else {
        items.forEach(item => item.remove());
    }
});
}

// Return welcome-page
var page1 = document.getElementById('return-button');
if(page1){
    page1.addEventListener('click', () => {
        window.location.href = 'index.html';
});
}

// send messages on submit
form!.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
        console.log('Mensaje enviado y almacenado')
    }
})