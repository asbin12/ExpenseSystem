import { useState } from "react";

const InputComp = ({
  type,
  placeholder,
  name,
  register,
  errors,
  children,
  className,
  // required,
  showPassword,
  visiblePasswordFn,
  defaultValue,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue); // <-- State to manage the input value
  // Handle change event
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <div className="pt-1 relative flex items-center justify-between">
        <input
          className={`w-full  outline-none rounded-md px-6 py-4 border border-[#282828] border-solid tracking-[0.09em] text-base font-light font-primary ${className}`}
          name={name}
          type={showPassword ? "text" : type}
          // required={required}
          placeholder={placeholder}
          {...register(name, {
            value: inputValue,
            onChange:handleChange,
            required: `Please enter ${name},it is required`,
          })}
        />
        {children && (
          <div className="absolute right-[2%]" onClick={visiblePasswordFn}>
            {children}
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500">
          {errors[name].message || "This field is required"}
        </p>
      )}
    </>
  );
};

export default InputComp;
