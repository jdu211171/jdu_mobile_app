import MessageObject from './MessageObject'
import AsyncStorage from '@react-native-async-storage/async-storage';

export class MessageCollection {
    private messages: MessageObject[] = [];
    private last_message_id: number | null = null;

    get get_messages() {
        return this.retrieveMessages;
    }

//
// public retrieveMessages() {
//     // Use then to handle the promise
//     this.fetchMessages()
//       .then(() => {
//         // Use the forEach method on the messages array
//         this.messages.forEach(message => {
//             // Print out each message object
//             console.log(message);
//         });
//     });
// }

    public retrieveMessages() {
// Use then and catch to handle the promise
        this.fetchMessages()
          // .then(() => {
          //     // Use the forEach method on the messages array
          //     this.messages.forEach(message => {
          //         // Print out each message object
          //         console.log(message);
          //     });
          // })
          .catch(error => {
// Handle the error
              console.error(error);
// Run this.setFromLocalMessages() function
              this.setFromLocalMessages();
          });
    }


// get message from api and add in messages field new messages
// private fetchMessages() {}
    private async fetchMessages() {
// Use fetch API to get the data from the given URL
        const response = await fetch('https://wfjz3m1ilh.execute-api.eu-north-1.amazonaws.com/default/api/messages');
// Check if the response is successful
        if (response.ok) {
// Parse the response as JSON
            const data = await response.json();
// Check if the data has a status property with value 'success'
            if (data.status === 'success') {
// Loop through the data array
                for (const item of data.data) {
// Create a MessageObject instance from the item
                    const message = new MessageObject({
                        id: item.id,
                        title: item.title,
                        description: item.description,
// Convert the priority number to priority type
                        priority: item.priority === 1 ? 'high' : item.priority === 2 ? 'medium' : 'low',
                        message_type_id: item.messagetype_id,
                        updated_date: item.updated_date
                    });
// Push the message to the messages array
                    this.messages.push(message);
                }
            } else {
// Handle the case when the data status is not 'success'
                console.error('Data status is not success');
            }
        } else {
// Handle the case when the response is not successful
            console.error('Response is not ok');
        }
    }

// get message from api lastet message and add in messages field new messages
    private fetchLatestMessages() {
    }

// this function save all messages to localstorage
// Nur Islom MeesageObject.getAllFields ishlatib malumot olasiz
    private saveMessagesToLocal() {
    }

// this function get messages from localstorage and assign to messages field
// private setFromLocalMessages() {}
// This function get messages from localstorage and assign to messages field
    private async setFromLocalMessages() {
        try {
// Get the value for the key 'messages' from AsyncStorage
            const value = await AsyncStorage.getItem('messages');
// Check if the value is not null
            if (value !== null) {
// Parse the value as JSON array
                const messagesArray = JSON.parse(value);
// Loop through the array
                for (const item of messagesArray) {
// Create a MessageObject instance from the item
                    const message = new MessageObject({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        priority: item.priority,
                        message_type_id: item.message_type_id,
                        updated_date: item.updated_date
                    });
// Push the message to the messages array
                    this.messages.push(message);
                }
            } else {
// Handle the case when the value is null
                console.log('No messages found in local storage');
            }
        } catch (error) {
// Handle any error
            console.error(error);
        }
    }

}

// const messageCollection = new MessageCollection();
// messageCollection.retrieveMessages();
// console.log(messageCollection.get_messages())