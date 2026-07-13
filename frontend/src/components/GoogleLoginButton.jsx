import React from 'react';
import { FcGoogle } from 'react-icons/fc';

/**
 * A highly reusable and premium Google Login Button component.
 * 
 * Props:
 * - onClick: Function to handle click events.
 * - text: The text to display on the button (defaults to "Continue with Google").
 * - isLoading: Displays a loading spinner and disables the button.
 * - disabled: Standard disabled state.
 * - className: Custom Tailwind classes to extend/override default styles.
 * - type: HTML button type (defaults to "button").
 */
const GoogleLoginButton = ({
    onClick,
    text = 'Continue with Google',
    isLoading = false,
    disabled = false,
    className = '',
    type = 'button',
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
        relative flex items-center justify-center gap-3 px-6 py-3 
        bg-white text-gray-700 font-semibold border border-gray-300/80
        rounded-xl shadow-xs cursor-pointer select-none
        transition-all duration-200 ease-out
        hover:bg-gray-50 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md
        active:translate-y-0 active:scale-98 active:shadow-xs
        disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none
        focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
        w-full max-w-sm
        ${className}
      `}
            {...props}
        >
            {isLoading ? (
                <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : (
                <FcGoogle className="text-2xl shrink-0" />
            )}

            <span className="truncate">{isLoading ? 'Signing in...' : text}</span>
        </button>
    );
};

export default GoogleLoginButton;
