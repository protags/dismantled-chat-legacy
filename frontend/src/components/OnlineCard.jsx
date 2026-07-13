import React from 'react'
import useSocket from '../store/useSocket';
import { IoPersonSharp } from 'react-icons/io5';
import { FiX } from 'react-icons/fi';

const OnlineCard = ({ user, onClose }) => {
    const { users } = useSocket();
    return (
        <div className='w-72 bg-[#2b2d31] p-4 flex flex-col gap-4 overflow-y-auto h-full shrink-0 border-l border-white/5'>
            {/* Header for Mobile Drawer */}
            <div className='lg:hidden flex items-center justify-between pb-2 border-b border-white/5 shrink-0'>
                <span className='text-[14px] font-semibold text-white'>Online Members</span>
                <button 
                    onClick={onClose}
                    className='text-[#b5bac1] hover:text-[#dbdee1] p-1 rounded hover:bg-white/5 transition-all cursor-pointer'
                >
                    <FiX className='text-[18px]' />
                </button>
            </div>

            <div className='text-[12px] font-bold text-[#949ba4] tracking-wide uppercase select-none px-2'>
                Online — {users.length}
            </div>
            <div className='flex flex-col gap-1'>
                {users.map((u) => (
                    <div
                        key={u.id}
                        className='flex items-center gap-3 px-2 py-1.5 rounded hover:bg-white/4 active:bg-white/6 transition-colors duration-150 cursor-pointer group'
                    >
                        <div className='relative w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white shrink-0 shadow-sm select-none overflow-hidden'>
                            {u.pfp ? (
                                <img src={u.pfp} alt={u.username} className="w-full h-full object-cover" />
                            ) : (
                                <IoPersonSharp className='text-base' />
                            )}
                            <div className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#23a55a] border-2 border-[#2b2d31] rounded-full' />
                        </div>
                        <span className='text-[14px] font-medium text-[#b5bac1] group-hover:text-[#dbdee1] truncate'>
                            {u.username}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OnlineCard