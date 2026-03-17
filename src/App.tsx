import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Header from "./Shared/Header/Header.tsx";
import TextInput from "./Shared/TextInput/TextInput.tsx";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const updatedMessages = [
      ...messages,
      { role: "user", content: input }
    ];

    setMessages(updatedMessages);
    setInput("");

    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: updatedMessages
      })
    });

    if (!res.body) {
      throw new Error("Response body is null");
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let assistantMessage = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      assistantMessage += chunk;

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: assistantMessage }
      ]);
    }
  };

  return (
    <>
      <Header />

      <div style={{
        height: "calc(100vh - 200px)",
        overflowY: "auto",
        marginLeft: "10%",
        marginRight: "10%"
      }}>
        <div className="chat">
          {messages.map((msg, index) => (
            <div key={index} className={msg.role}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: "fixed",
        bottom: 0,
        left: "10%",
        right: "10%",
        padding: "20px",
        backgroundColor: "white",
        borderTop: "1px solid #ccc"
      }}>
        <TextInput
          input={input}
          setInput={setInput}
          onSend={sendMessage}
        />
      </div>
    </>
  );
}

export default App;