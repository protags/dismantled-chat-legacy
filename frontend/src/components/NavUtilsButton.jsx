import React from 'react'

const NavUtilsButton = ({ children, Icon, disabled = false }) => {
    return (
        <div className={`flex ${disabled && "brightness-50"} items-center p-2 rounded-md hover:bg-gray-700/50 ${!disabled ? "cursor-pointer" : "cursor-not-allowed"}`}>
            {
                Icon && (
                    <Icon className="mr-2 text-2xl" />
                )
            }
            <button className='text-xl text-white/50'>{children}</button>
        </div>
    )
}

export default NavUtilsButton