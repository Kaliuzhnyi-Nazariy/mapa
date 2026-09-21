const Button = ({
  text,
  fn,
  isDisabled,
  type = "button",
}: {
  text: string;
  fn?: () => void;
  isDisabled: boolean;
  type: "button" | "submit";
}) => {
  return (
    <button
      className="disabled:opacity-50 mt-4 w-full py-2 bg-orange-500 text-white"
      disabled={isDisabled}
      onClick={fn}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
