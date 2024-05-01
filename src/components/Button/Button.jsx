const Button = ({ handler, text }) => {
  return (
    <div className="text-center w-full">
      <button
        className="text-primary w-fit mx-auto border border-[#f85606] px-12 py-2"
        onClick={handler}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
