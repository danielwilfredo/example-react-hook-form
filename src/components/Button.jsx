const Button = ({ type, onClick, text }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-green-500 hover:bg-green-300 text-black font-bold py-2 px-4 rounded transition-colors"
    >
      {text}
    </button>
  );
};

export default Button;
