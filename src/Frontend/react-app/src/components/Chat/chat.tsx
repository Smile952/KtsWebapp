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

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Здравствуйте! Чем можем помочь?", sender: "support" }
  ]);

  const handleSend = (text: string) => {
    setMessages(prev => [
      ...prev,
      { message: text, sender: "user" }
    ]);
  };

  return (
    <>
      {/* Кнопка открытия */}
      {!isOpen && (
        <button
          className={styles.floatingButton}
          onClick={() => setIsOpen(true)}
          aria-label="Открыть чат"
        >
          💬
        </button>
      )}

      {/* Виджет */}
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
                        m.sender === "user"
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
