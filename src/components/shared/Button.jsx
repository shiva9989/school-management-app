// src/components/shared/Button.jsx
export default function Button({ 
    children, 
    variant = 'primary', 
    type = 'button', 
    onClick,
    disabled = false 
  }) {
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant]} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {children}
      </button>
    );
  }