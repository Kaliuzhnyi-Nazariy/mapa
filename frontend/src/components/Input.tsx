import { useState } from "react";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  isPending?: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const FormInput = ({
  id,
  label,
  type = "text",
  isPending = false,
  register,
  error,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const liStyle =
    "group opacity-50 focus-within:opacity-100 transition-opacity duration-150 flex flex-col gap-2";

  const inputStyle =
    "outline focus:outline-amber-500 transition-colors relative w-full px-2 py-1 rounded";

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={liStyle}>
      <label htmlFor={id}>{label}:</label>

      <div className="relative w-full">
        <input
          id={id}
          type={inputType}
          className={`${inputStyle} ${isPassword ? "pr-8" : ""}`}
          disabled={isPending}
          {...register}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 -translate-y-1/2 right-2 size-5 flex items-center justify-center text-gray-500 hover:text-gray-700"
            disabled={isPending}
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        )}
      </div>

      {error?.message && (
        <p className="text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;
