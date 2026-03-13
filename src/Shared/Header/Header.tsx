import { styles } from "./Header.ts";

const Header = () => {
    return (
        <header style={styles.chatHeader}>
            <p style={styles.chatTitle}>chatBot</p>
        </header>
    );
};

export default Header;
