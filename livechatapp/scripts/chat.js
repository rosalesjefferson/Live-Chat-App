
// adding a chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class Chatroom {
    constructor(ROOM, USERNAME){
        this.room = ROOM;
        this.username = USERNAME;
        this.chats = db.collection('chats');
        this.unsub;
    }

    
    async addChat(message){
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await this.chats.add(chat);
        return response;
    }

    getChats(callbackData){
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(changeData => {
                
                if(changeData.type === 'added'){
                    //update UI
                    callbackData(changeData.doc.data());
                }
            });
        });
    }
    updateName(newUsername){
        this.username = newUsername;
        localStorage.setItem('newUsername', newUsername);
    }
 
    updateRoom(newRoom){
        this.room = newRoom;
        console.log('room updated');
        if(this.unsub){
            this.unsub();
        }
    }
}
