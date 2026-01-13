import { useState } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput
} from "@chatscope/chat-ui-kit-react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import styles from "./Chat.module.css";
import { UserDataAndTokenStore } from "store/store";
import { addrToApis, apiControllers } from "common/Constants/addr";
import { MessageEntity } from "common/Entityes/MessageEntity/MessageEntity";

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Здравствуйте! Я чат-бот сайта КТС. Мое призвание помочь в выборе и оформлении заказа. Чем могу помочь?", sender: "support" }
  ]);

  const userStore = UserDataAndTokenStore.getState().UserEntity
  const token = userStore.token;
  const userName = userStore.name || "Пользователь";

  const handleSend = async (text: string) => {
    setMessages(prev => [
      ...prev,
      { message: text, sender: userName }
    ]);

    const message: MessageEntity = {
      text: text,
      senderId: userStore.id,
      receiverId: 1, // Assuming '1' is the support bot's ID
      sendedAt: new Date().toISOString(),
      isReaded: true
    }
    const response = await fetch(`${apiControllers.MessageController}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    });

    if(!response.ok){
      console.error('Ошибка при отправке сообщения:', response.statusText);
      return;
    }
    else{
      const data = await response.json();
      setMessages(prev => [
        ...prev,
        { message: data.text, sender: "support" }
      ]);
      
    }
  };



  return (
    <>
      {!isOpen && (
        <button
          className={styles.floatingButton}
          onClick={() => setIsOpen(true)}
          aria-label="Открыть чат"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className={styles.widgetContainer}>
          <header className={styles.header}>
            <span>Поддержка</span>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </header>

          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messages.map((m, i) => (
                  <Message
                    key={i}
                    model={{
                      message: m.message,
                      sender: m.sender,
                      direction:
                        m.sender === userName
                          ? "outgoing"
                          : "incoming",
                      position: "single"
                    }}
                  />
                ))}
              </MessageList>
              <MessageInput
                placeholder="Введите сообщение..."
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      )}
    </>
  );
}
