import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "./Shared/Header/Header.tsx";
import TextInput from "./Shared/TextInput/TextInput.tsx";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    setResponse("");

    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    const reader = res?.body?.getReader();
    const decoder = new TextDecoder();

    let done = false;

    while (!done && reader) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      const chunk = decoder.decode(value);
      setResponse(prev => prev + chunk);
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
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {response}
        </ReactMarkdown>
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