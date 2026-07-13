import React from 'react'

const Button = ({
    children,
    variant = 'primary',
    type = 'button',
    disabled = false,
    className = '',
    onClick,
    ...props
}) => {
    // Discord Button Variants
    const variants = {
        primary: 'bg-[#5865f2] hover:bg-[#4752c4] active:bg-[#3c45a5] text-white',
        secondary: 'bg-[#4e5058] hover:bg-[#6d6f78] active:bg-[#80848e] text-white',
        success: 'bg-[#248046] hover:bg-[#1a6535] active:bg-[#15512b] text-white',
        danger: 'bg-[#da373c] hover:bg-[#a92b2f] active:bg-[#892225] text-white',
        link: 'bg-transparent text-[#00a8fc] hover:underline px-0 py-0 font-normal'
    }

    const baseStyle = 'font-medium text-[14px] rounded-[3px] py-2 px-5 transition-colors duration-150 ease-in-out cursor-pointer flex items-center justify-center gap-2 select-none min-h-[38px]'
    const variantStyle = variants[variant] || variants.primary
    const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variantStyle} ${disabledStyle} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
