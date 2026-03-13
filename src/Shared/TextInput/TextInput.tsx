import React, { useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { styles } from "./TextInput.ts";

interface ChatInputProps {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
    input,
    setInput,
    onSend,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);

        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";

        const lineHeight = 24;
        const maxHeight = lineHeight * 5;

        textarea.style.height =
            textarea.scrollHeight > maxHeight
                ? `${maxHeight}px`
                : `${textarea.scrollHeight}px`;

        textarea.style.overflowY =
            textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div style={styles.wrapper}>
            <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={2}
                style={styles.textarea}
            />

            <button onClick={onSend} style={styles.sendButton}>
                <span style={styles.icon}>
                    ➤
                </span>
            </button>
        </div>
    );
};

export default ChatInput;