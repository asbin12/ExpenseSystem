const Buttons = ({ text, icon, type, onClick, className, children }) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`w-full bg-blue-500 px-6 py-4 text-white rounded-lg font-primary font-medium text-base ${className} `}
      >
        {icon} {text} {children}
      </button>
    </div>
  );
};

export default Buttons;
