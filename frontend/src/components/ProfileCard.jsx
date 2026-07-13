import React from 'react'
import { IoPersonSharp } from 'react-icons/io5'
import { LuLogOut } from 'react-icons/lu'
import useAuth from '../store/useAuth';

const ProfileCard = ({ user }) => {
    const logout = useAuth((s) => s.logout);
    return (
        <div className='p-2 bg-[#232428] flex items-center justify-between gap-2 border-t border-white/5'>
            <div className='flex items-center gap-2 min-w-0'>
                <div className='relative shrink-0 w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white shadow-sm select-none overflow-hidden'>
                    {user.pfp ? (
                        <img src={user.pfp} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                        <IoPersonSharp className='text-base' />
                    )}
                    <div className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#23a55a] border-2 border-[#232428] rounded-full' />
                </div>

                {/* Name & Status */}
                <div className='flex flex-col min-w-0 leading-tight select-none'>
                    <span className='text-[13px] font-semibold text-white truncate hover:underline cursor-pointer'>
                        {user.username}
                    </span>
                    <span className='text-[10px] text-[#b5bac1] truncate'>
                        Online
                    </span>
                </div>
            </div>

            {/* Logout Button */}
            <button
                onClick={logout}
                title="Log Out"
                className='text-[#b5bac1] hover:text-[#dbdee1] hover:bg-[#35373c] p-1.5 rounded transition-all duration-150 cursor-pointer'
            >
                <LuLogOut className='text-[18px]' />
            </button>
        </div>
    )
}

export default ProfileCard