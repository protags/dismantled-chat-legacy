import React, { useEffect, useRef, useState } from 'react'
import { AiFillGift } from "react-icons/ai";
import { BsPersonFillAdd, BsFillTerminalFill } from "react-icons/bs";
import NavUtilsButton from '../components/NavUtilsButton.jsx';
import { LuWaypoints, LuLogOut } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { FiMenu, FiUsers, FiX } from "react-icons/fi"; // Added menu icons
import ChatInput from '../components/ChatInput.jsx';
import ChatBox from '../components/ChatBox.jsx';
import useAuth from '../store/useAuth.js';
import { useNavigate } from 'react-router-dom';
import useSocket from '../store/useSocket.js';
import ProfileCard from '../components/ProfileCard.jsx';
import OnlineCard from '../components/OnlineCard.jsx';

const Chat = () => {
    const { user, isLogin } = useAuth();
    const logout = useAuth((s) => s.logout);
    const nav = useNavigate();
    const { messages, users } = useSocket();
    const bottomRef = useRef(null);

    // States for mobile drawer toggle
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isLogin) {
            nav("/")
        }
    }, [isLogin, nav]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        })
    }, [messages])

    return (
        <div className='flex flex-col h-screen relative bg-[#313338] text-[#dbdee1]'>
            {/* Responsive Header */}
            <div className='h-12 bg-[#1e1f22] px-4 flex items-center justify-between border-b border-black/20 select-none shrink-0'>
                <div className='flex items-center gap-2'>
                    {/* Hamburger button */}
                    <button
                        onClick={() => setIsLeftSidebarOpen(true)}
                        className='lg:hidden text-[#b5bac1] hover:text-[#dbdee1] hover:bg-white/5 p-1.5 rounded transition-all duration-150 cursor-pointer flex items-center'
                        title="Open Navigation"
                    >
                        <FiMenu className='text-[20px]' />
                    </button>
                    
                    <div className='flex items-center text-sm text-[#dbdee1] font-semibold'>
                        <AiFillGift className='mr-1.5 text-[18px] text-[#b5bac1]' />
                        <span>Direct Message</span>
                    </div>
                </div>

                {/* Right side: Online list toggle for mobile */}
                <button
                    onClick={() => setIsRightSidebarOpen(true)}
                    className='lg:hidden text-[#b5bac1] hover:text-[#dbdee1] hover:bg-white/5 p-1.5 rounded transition-all duration-150 cursor-pointer flex items-center'
                    title="Show Online Members"
                >
                    <FiUsers className='text-[20px]' />
                </button>
            </div>

            <div className='flex-1 overflow-hidden relative'>
                <div className='overflow-hidden flex flex-row h-full w-full'>
                    {/* Backdrops for Mobile sidebars */}
                    {isLeftSidebarOpen && (
                        <div
                            className="fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity duration-300"
                            onClick={() => setIsLeftSidebarOpen(false)}
                        />
                    )}
                    {isRightSidebarOpen && (
                        <div
                            className="fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity duration-300"
                            onClick={() => setIsRightSidebarOpen(false)}
                        />
                    )}

                    {/* Left Sidebar */}
                    <div className={`
                        fixed inset-y-0 left-0 z-50 w-72 shrink-0 flex flex-col bg-[#2b2d31] transition-transform duration-300 ease-in-out border-r border-white/5
                        lg:static lg:bg-gray-700/30 lg:translate-x-0 lg:border-r-0
                        ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}>
                        {/* Header inside Left Sidebar for Mobile */}
                        <div className='lg:hidden p-3 flex items-center justify-between border-b border-white/5 bg-[#1e1f22]/50 shrink-0'>
                            <span className='text-[14px] font-semibold text-white'>Navigation</span>
                            <button
                                onClick={() => setIsLeftSidebarOpen(false)}
                                className='text-[#b5bac1] hover:text-white p-1 rounded hover:bg-white/5 transition-all cursor-pointer'
                            >
                                <FiX className='text-lg' />
                            </button>
                        </div>

                        <div className='flex-1 overflow-y-auto'>
                            <div className='p-2 border border-b-white/5 border-x-white/5 border-t-white/0'>
                                <button
                                    className='bg-[#1e1f22]/60 p-2 rounded-xl w-full cursor-pointer hover:brightness-90 active:brightness-85 text-[#949ba4] hover:text-[#dbdee1] transition-all text-sm font-medium text-left'>
                                    Find or start a conversation
                                </button>
                            </div>
                            <div className='p-2'>
                                <NavUtilsButton Icon={BsPersonFillAdd}>Friends</NavUtilsButton>
                                <NavUtilsButton Icon={LuWaypoints}>Chat Points</NavUtilsButton>
                            </div>
                            <div className='border mx-3 border-white/8' />
                            <div className='p-2'>
                                <NavUtilsButton Icon={BsFillTerminalFill}>Channel: Test</NavUtilsButton>
                            </div>
                        </div>
                        {user && (
                            <ProfileCard user={user} />
                        )}
                    </div>

                    {/* Main Chat Container */}
                    <div className='flex-1 flex flex-col bg-gray-700/45 relative min-w-0 h-full'>
                        <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-4'>
                            {
                                messages && (
                                    messages.map((data, index) => (
                                        <ChatBox
                                            key={data.time}
                                            username={data.username}
                                            pfp={data.pfp}
                                            profileColor="#5865f2"
                                            timestamp={data.time}
                                            message={data.msg}
                                        />
                                    ))
                                )
                            }
                            <div ref={bottomRef} />
                        </div>
                        <ChatInput />
                    </div>

                    {/* Right Sidebar (OnlineCard Wrapper) */}
                    <div className={`
                        fixed inset-y-0 right-0 z-50 w-72 shrink-0 transition-transform duration-300 ease-in-out h-full
                        lg:static lg:translate-x-0
                        ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                    `}>
                        <OnlineCard user={user} onClose={() => setIsRightSidebarOpen(false)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat