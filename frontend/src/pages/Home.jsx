import React, { useEffect, useState } from 'react'
import useThemes from '../store/useThemes'
import LoginCard from '../components/LoginCard.jsx'
import useSocket from '../store/useSocket.js'
import { useNavigate } from 'react-router-dom'
import useAuth from '../store/useAuth.js'
import { GoogleLogin } from '@react-oauth/google'

const Home = () => {
    const [username, setUsername] = useState("");
    const createUser = useSocket((s) => s.createUser);
    const nav = useNavigate();
    const { isLogin } = useAuth();

    useEffect(() => {
        if (isLogin) {
            nav("/chat")
        }
    }, [isLogin]);

    const loginHandler = () => {
        if (!username.trim()) return;
        createUser(username);
        setUsername("");
        nav("/chat");
    }

    const handleGoogleSuccess = (credentialResponse) => {
        const token = credentialResponse.credential;
        if (!token) return;

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                window.atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            const payload = JSON.parse(jsonPayload);

            if (payload && payload.name) {
                // Pass name, email, and picture (pfp)
                createUser(payload.name, payload.email, payload.picture);
                nav("/chat");
            }
        } catch (error) {
            console.error("Failed to parse Google credential token:", error);
        }
    };

    return (
        <div className='flex justify-center items-center h-dvh bg-[#1e1f22]'>
            <LoginCard
                username={username}
                setUsername={setUsername}
                onSubmit={loginHandler}
            >
                <div className="flex flex-col items-center gap-4 mt-6">
                    <div className="flex items-center w-full gap-2">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <span className="text-[#b5bac1] text-[11px] font-bold uppercase tracking-wider select-none">
                            Or continue with
                        </span>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <div className="w-full flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                            theme="filled_blue"
                            size="large"
                            text="signin_with"
                            shape="rectangular"
                            width="100%"
                        />
                    </div>
                </div>
            </LoginCard>
        </div>
    )
}

export default Home