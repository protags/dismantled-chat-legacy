import React from 'react'
import { IoPersonSharp } from "react-icons/io5";
import useSocket from '../store/useSocket';

const formatTimestamp = (dateInput) => {
    if (!dateInput) return '';

    let date;
    if (dateInput instanceof Date) {
        date = dateInput;
    } else if (typeof dateInput === 'number' || typeof dateInput === 'string') {
        // If it's already a formatted string (like '7/8/26, 6:31 AM'), return it directly
        if (typeof dateInput === 'string' && (dateInput.includes('AM') || dateInput.includes('PM'))) {
            return dateInput;
        }
        date = new Date(dateInput);
    } else {
        return String(dateInput);
    }

    // Fallback if Date parsing fails
    if (isNaN(date.getTime())) {
        return String(dateInput);
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const timeString = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    if (compareDate.getTime() === today.getTime()) {
        return `Today at ${timeString}`;
    } else if (compareDate.getTime() === yesterday.getTime()) {
        return `Yesterday at ${timeString}`;
    } else {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = String(date.getFullYear()).slice(-2);
        return `${month}/${day}/${year}, ${timeString}`;
    }
};

const ChatBox = ({ profileColor, username, pfp, message, timestamp = '7/8/26, 6:31 AM' }) => {
    const renderMessage = () => {
        if (typeof message === 'string') {
            return message.split('\n').map((line, idx) => (
                <p key={idx} className={idx > 0 ? 'mt-0.5' : ''}>
                    {line}
                </p>
            ));
        }
        return message;
    };

    // Determine custom color or default values
    const avatarBg = profileColor || '#4e5058';
    const nameColor = profileColor || '#ef4444';

    return (
        <div className='flex items-start gap-4 hover:bg-white/2 p-1.5 -mx-1.5 rounded transition-colors group'>
            <div
                className='w-10 h-10 rounded-full flex items-center justify-center text-[#dbdee1] shrink-0 shadow-sm overflow-hidden'
                style={{ backgroundColor: avatarBg }}
            >
                {pfp ? (
                    <img src={pfp} alt={username} className="w-full h-full object-cover" />
                ) : (
                    <IoPersonSharp className='text-xl' />
                )}
            </div>
            <div className='flex-1 flex flex-col min-w-0'>
                <div className='flex items-baseline gap-2'>
                    <span
                        className='font-semibold text-[15px] hover:underline cursor-pointer'
                        style={{ color: nameColor }}
                    >
                        {username || 'Ceraph'}
                    </span>
                    <span className='text-[11px] text-[#949ba4] font-medium'>
                        {formatTimestamp(timestamp)}
                    </span>
                </div>
                <div className='text-[#dbdee1] text-[15px] leading-[22px] font-normal mt-1'>
                    {renderMessage()}
                </div>
            </div>
        </div>
    )
}

export default ChatBox