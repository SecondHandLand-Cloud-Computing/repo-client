import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const FloatingInput = ({ id, label, type = "text", value, onChange, error }) => {
  const [hasValue, setHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setHasValue(Boolean(value && value.toString().trim() !== ""));
  }, [value]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative mb-5 w-full">
      <div className="relative w-full">
        <input
          id={id}
          name={id} // ✅ Thêm name để useForm hoạt động chuẩn
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`peer w-full rounded-lg border-[1.5px] px-3 pr-10 py-3 text-base outline-none bg-white transition-all
            ${error ? "border-rose-600" : "border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50"}`}
        />

        <label
          htmlFor={id}
          className={`absolute left-3 top-1/2 -translate-y-1/2 bg-white text-gray-600 px-1 transition-all duration-200
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-600 peer-placeholder-shown:text-base
            peer-focus:top-[-8px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-emerald-600
            ${hasValue ? "top-[-8px] left-2 text-xs text-emerald-600" : ""} 
            ${error ? "!text-rose-600" : ""}`}
        >
          {label}
        </label>

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label="Toggle password visibility"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-teal-700 p-1 rounded-full hover:bg-emerald-100 transition-colors"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.65 21.65 0 0 1 5.06-6.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.77 21.77 0 0 1-2.18 3.25" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && <p className="text-rose-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

FloatingInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default FloatingInput;
