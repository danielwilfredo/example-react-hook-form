const ButtonDelete = ({ type, onClick, text }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-red-500 hover:bg-red-300 text-black font-bold py-2 px-4 rounded transition-colors"
    >
      {text}
    </button>
  );
};

export default ButtonDelete;
