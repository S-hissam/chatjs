//render the chats
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add new chat
newChat.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = newChat.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChat.reset())
    .then((error) => console.log(error))
});

//update username
newName.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = newName.name.value.trim();
  chatroom.updateName(name);
  //reset form
  newName.reset();
  //show update message
  updateMsg.innerText = `Your name was updated! ${name}`;
  setTimeout(() => updateMsg.innerText = '', 2000);
});

// update room
rooms.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    chatui.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatui.render(chat));
  }
})

//localstorage check for username
const username = localStorage.username ? localStorage.username : 'anon';
const room = localStorage.room ? localStorage.room : 'general';

//class instence
const chatroom = new Chatroom(room, username);
const chatui = new ChatUI(chatList);


//get the chats
chatroom.getChats(data =>  chatui.render(data));