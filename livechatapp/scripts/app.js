//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const ROOMS = document.querySelector('.chat-rooms');
// add a new chat
newChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messages = newChatForm.message.value.trim();
    chatrooms.addChat(messages)
        .then(() => {
            newChatForm.reset();
        }).catch((error) => {
            console.log(error);
        }); 
});

//update username
newNameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // update name via chatroom 
    const newName = newNameForm.name.value.trim();
    chatrooms.updateName(newName);
    //reset the form
    newNameForm.reset();
    //show and hide the update message
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => {
        updateMssg.innerText = '';
    }, 3000);
});

//Update the chat room
ROOMS.addEventListener('click', (e) => {
   if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatrooms.updateRoom(e.target.getAttribute('id'));
    chatrooms.getChats((callbackData) => {
        chatUI.render(callbackData);
    });
   }

})

// Check local storage for a name
const usernames = localStorage.newUsername ? localStorage.newUsername : 'anonymous';   

//class instances
const chatUI = new ChatUI(chatList);
const chatrooms = new Chatroom('general', usernames);

//get the chat and render
chatrooms.getChats((callbackData) => {
    chatUI.render(callbackData);
});
