import React from 'react'
import Input from './Input.jsx'
import Button from './Button.jsx'

const LoginCard = ({
    title = 'Welcome back!',
    subtitle = "We're so excited to see you again!",
    username,
    setUsername,
    onSubmit,
    buttonText = 'Log In',
    placeholder = 'Enter your username',
    children
}) => {
    return (
        <div className='bg-[#313338] w-full max-w-[480px] rounded-lg p-8 shadow-2xl flex flex-col mx-4'>
            <h2 className='text-[24px] font-semibold text-white text-center mb-2 select-none'>
                {title}
            </h2>
            <p className='text-[#b5bac1] text-[14px] text-center mb-6 select-none'>
                {subtitle}
            </p>
            
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    if (onSubmit) onSubmit();
                }}
                className='flex flex-col gap-5'
            >
                <Input
                    label="Username"
                    required={true}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={placeholder}
                    autoFocus
                />
                
                <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full mt-2"
                    disabled={!username?.trim()}
                >
                    {buttonText}
                </Button>
            </form>
            {children}
        </div>
    )
}

export default LoginCard
