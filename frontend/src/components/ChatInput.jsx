import React, { useState } from 'react'
import { LuPlus, LuSend } from 'react-icons/lu'
import useSocket from '../store/useSocket'

const ChatInput = () => {
    const sendMessage = useSocket((s) => s.sendMessage);
    const [userInput, setUserInput] = useState("");
    const sendMessageHandler = () => {
        const message = userInput.trim();

        if (!message) return;

        sendMessage(message);
        setUserInput("");
    };
    return (
        <div className='p-4 pt-0'>
            <div className='bg-[#383a40] text-[#dbdee1] rounded-lg px-4 py-2.5 flex items-center gap-4 shadow-sm'>
                {/* Plus button on the left */}
                <button
                    className='text-[#b5bac1] hover:text-[#dbdee1] hover:bg-[#4e5058] transition-colors p-1.5 rounded-full cursor-pointer flex items-center justify-center'
                >
                    <LuPlus className='text-xl' />
                </button>

                {/* Input field in the middle */}
                <input
                    type='text'
                    onChange={(e) => setUserInput(e.target.value)}
                    value={userInput}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessageHandler();
                        }
                    }}
                    placeholder='Message #Test'
                    className='bg-transparent flex-1 focus:outline-none text-[#f2f3f5] placeholder-[#80848e] text-[15px]'
                />

                {/* Send button on the right */}
                <button
                    onClick={sendMessageHandler}
                    className='text-[#80848e] hover:text-[#dbdee1] hover:bg-[#4e5058] p-1.5 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer'
                >
                    <LuSend className='text-xl' />
                </button>
            </div>
        </div>
    )
}

export default ChatInput