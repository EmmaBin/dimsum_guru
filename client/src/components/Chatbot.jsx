import React from 'react'
import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { TypingIndicator, MainContainer, ChatContainer, MessageList, Message, MessageInput, } from '@chatscope/chat-ui-kit-react';



export default function Chatbot() {
    const [isTyping, setIsTyping] = useState(false);
    const API_KEY = process.env.REACT_APP_OPENAI;

    const [msg, setMsg] = useState([
        {
            message: "Hello, I'm the Dim Sum Guru! Feel free to ask me anything!",
            sender: "assistant"
        }
    ]);


    const handleSend = async (outGoingMsg) => {

        console.log(outGoingMsg)
        const openHours = /open\s*hours/i;
        if (openHours.test(outGoingMsg)) {
            const answerToHours = "Hello! To the best of my knowledge, Dim Sum Guru restaurant is open from 9 am to 9 pm every day of the week except for Tuesdays and public holidays."
            const incomingMsgObj = {
                message: outGoingMsg,
                direction: 'outgoing',
                sender: "user"
            }
            const simulatedResponse = {
                choices: [{
                    message: {
                        content: answerToHours
                    }
                }]
            };

            const assistantResponse = {
                message: simulatedResponse.choices[0].message.content,
                sender: "assistant"
            };
            const newMessages = [...msg, incomingMsgObj, assistantResponse];
            setMsg(newMessages);

        }
        else {
            setIsTyping(true);
            const newMessage = {
                message: outGoingMsg,
                direction: 'outgoing',
                sender: "user"
            }
            const newMessages = [...msg, newMessage];
            setMsg(newMessages);
            //if pass msg state value as argument, it's not functioning correctly
            await processMsg(newMessages);


        }

    };

    //get reference from https://platform.openai.com/docs/api-reference/chat
    const processMsg = async (newMsgs) => {
        console.log("here is key", API_KEY)
        let bodyMsg = newMsgs.map((messageObject) => {
            return { role: messageObject.sender, content: messageObject.message }
        });

        const postBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a dim sum expert with 10 years of experience. Your role is to assist customers with your knowledge."
                },
                ...bodyMsg
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postBody)
            })
            .then((data) => data.json())
            .then((res) => {
                setIsTyping(false);
                console.log(res);
                setMsg([...newMsgs, {
                    message: res.choices[0].message.content,
                    sender: "assistant"
                }]);

            });
    }

    return (
        <div>
            <div style={{ fontSize: "1em", position: "relative", height: "300px", width: "300px", border: "2px solid gray" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="Guru is typing" /> : null}
                        >
                            {msg.map((message, index) => {
                                return <Message key={index} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type your question here..." onSend={handleSend} style={{ backgroundColor: "white", color: "gray" }} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}
