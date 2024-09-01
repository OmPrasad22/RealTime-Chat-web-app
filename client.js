const socket = io('http://localhost:8000/');

const form = document.getElementById('sendContainer');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

var chatAudio = new Audio('ting.mp3');

const user = prompt("Enter your name to join");
socket.emit('new-user-joined', user);

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        chatAudio.play();
    }
    var objDiv = document.getElementById('updateDiv'); 
    objDiv.scrollTop = objDiv.scrollHeight;
};

socket.on('user-joined', user=>{
    append(`${user} joined the chat`, 'mid');
});

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('leave', user=>{
    append(`${user} left the chat`, 'mid');
});

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';
});
