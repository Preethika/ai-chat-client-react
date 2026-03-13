export const styles: { [key: string]: React.CSSProperties } = {
    wrapper: {
        position: "relative",
        width: "100%",
    },
    textarea: {
        width: "100%",
        minHeight: "48px",
        maxHeight: "120px",
        padding: "12px 45px 12px 12px",
        fontSize: "14px",
        lineHeight: "24px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        resize: "none",
        outline: "none",
        boxSizing: "border-box",
        transition: "all 0.2s ease",
    },
    sendButton: {
        position: "absolute",
        right: "10px",
        bottom: "25px",
        background: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        cursor: "pointer",
        fontSize: "14px",
    },
    icon: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    },
};