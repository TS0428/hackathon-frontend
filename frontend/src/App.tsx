import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./firebase";
import LoginForm from "./LoginForm";

const Contents: React.FC = () => {
    return <div>これはログインユーザーのみが見られるコンテンツです。</div>;
};

const App: React.FC = () => {
    const [loginUser, setLoginUser] = useState(() => fireAuth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
            setLoginUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <LoginForm />
            {/* ログインしていないと見られないコンテンツは、loginUserがnullの場合表示しない */}
            {loginUser ? <Contents /> : null}
        </>
    );
};

export default App;

