import NetInfo from '@react-native-community/netinfo';
import axios from "axios";
import {useEffect, useState} from 'react';
import api from '../api.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-root-toast';
import Message from "./Message";
import * as React from "react";
import {RefreshControl, View, StyleSheet, ScrollView} from "react-native";


export default function MessageCollection() {
    class MessagesObject {
        constructor(
            id,
            title,
            description,
            priority,
            message_type_id,
            updated_date,
            isRead = false,
            isReadSent = false,
            isSaved = false,
            isSavedSent = false,
        ) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.priority = priority;
            this.message_type_id = message_type_id;
            this.isRead = isRead;
            this.isReadSent = isReadSent;
            this.isSaved = isSaved;
            this.isSavedSent = isSavedSent;
            this.updatedDate = updated_date;
        }
        
        setRead() {
            this.isRead = true;
        }
        
        setReadSent() {
            this.isReadSent = true;
        }
        
        setSave() {
            this.isSaved = !this.isSaved;
        }
        
        setSaveSent() {
            this.isSavedSent = true;
        }
        
        getAllFields() {
            return {
                id: this.id,
                title: this.title,
                description: this.description,
                priority: this.priority,
                message_type_id: this.message_type_id,
                updated_date: this.updatedDate,
                isRead: this.isRead,
                isReadSent: this.isReadSent,
                isSaved: this.isSaved,
                isSavedSent: this.isSavedSent,
            };
        }
        
    }
    
    const [messages, setMessages] = useState([]);
    const [inetStatus, setInet] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const getMessageFromLocal = async () => {
        Toast.show('You are offline. Displaying locally saved messages.', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
        
        const localMessages = await AsyncStorage.getItem("messages")
        if (localMessages) {
            const messagesFromLocal = JSON.parse(localMessages);
            const messageCollection = [];
            messagesFromLocal.map((
                {
                    id,
                    title,
                    description,
                    priority,
                    message_type_id,
                    updated_date,
                    isRead,
                    isReadSent,
                    isSaved,
                    isSavedSent
                }
            ) => {
                messageCollection.push(new MessagesObject(
                    id,
                    title,
                    description,
                    priority,
                    message_type_id,
                    updated_date,
                    isRead,
                    isReadSent,
                    isSaved,
                    isSavedSent,
                ));
            });
            
            setMessages(messageCollection);
        }
    }
    
    const saveToLocal = async () => {
        const messageFields = [];
        messages.map((messageObject) => {
            messageFields.push(messageObject.getAllFields());
        });
        
        await AsyncStorage.setItem("messages", JSON.stringify(messageFields));
    }
    const getMessages = async () => {
        let hasInet = (await NetInfo.fetch()).isConnected;
        setInet(hasInet)
        
        if (hasInet) {
            axios.get(api.url + api.messages)
                .then(
                    async (response) => {
                        const response_messages = response.data.data;
                        
                        const messageCollection = [];
                        
                        response_messages.map((
                            {id, title, description, priority, updated_date, messagetype_id}
                        ) => {
                            messageCollection.push(new MessagesObject(
                                id, title, description, priority, messagetype_id, updated_date,
                            ));
                        });
                        
                        
                        // await AsyncStorage.setItem("messages", JSON.stringify(response_messages));
                        setMessages(messageCollection);
                        await saveToLocal()
                    }
                ).catch((e) => {
                console.log(e)
                getMessageFromLocal()
            })
        } else {
            await getMessageFromLocal()
        }
        
    }
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getMessages().then(() => setRefreshing(false));
    }, []);
    
    
    const save = (id, method) => {
        let toLocalMessages = messages;
        for (const toLocalMessage of toLocalMessages) {
            if (toLocalMessage.id === id) {
                if (method === 'bookmark') {
                    toLocalMessage.setSave()
                    console.log(id, toLocalMessage.isSaved)
                } else if (method === 'sent-bookmark') {
                    toLocalMessage.setSaveSent()
                } else if (method === 'read') {
                    toLocalMessage.setRead()
                } else if (method === 'sent-read') {
                    toLocalMessage.setReadSent()
                }
                break;
            }
        }
        setMessages(toLocalMessages)
        saveToLocal()
    }
    
    useEffect(() => {
        getMessages()
    }, []);
    
    return (
        <ScrollView
            contentContainerStyle={{
                width: '100%',
                alignItems: 'center',
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 8
            }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {
                messages.map((messageObject) => {
                    return (<Message
                        key={messageObject.id + Date.now()}
                        messageIconName="information-circle"
                        messageIconColor="#0386D0"
                        messageTitle={messageObject.title}
                        messageText={messageObject.description}
                        date={messageObject.updated_date}
                        messageObject={messageObject}
                        save={save}
                    />)
                })
            }
        </ScrollView>
    )
}