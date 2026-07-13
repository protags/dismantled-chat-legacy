import React from 'react'

const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    error,
    disabled = false,
    className = '',
    ...props
}) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && (
                <label className="flex justify-between items-baseline mb-2">
                    <span className={`text-[12px] font-bold tracking-wider uppercase flex items-center gap-0.5 select-none ${error ? 'text-[#f23f43]' : 'text-[#b5bac1]'}`}>
                        {label}
                        {required && <span className="text-[#f23f43] font-semibold">*</span>}
                    </span>
                    {error && (
                        <span className="text-[12px] font-medium text-[#f23f43] italic lowercase first-letter:uppercase">
                            - {error}
                        </span>
                    )}
                </label>
            )}

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full bg-[#1e1f22] text-[#dbdee1] placeholder-[#80848e] px-3 py-2.5 rounded-[4px] border ${error ? 'border-[#f23f43]' : 'border-transparent'
                    } focus:outline-none focus:border-[#5865f2] transition-colors duration-200 text-[15px] ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                {...props}
            />
        </div>
    )
}

export default Input
