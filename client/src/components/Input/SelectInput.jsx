const SelectInput = ({ options, value, className, onSelectChange }) => {
  const lowercaseValue = value.map((value) => {
    return typeof value === "string" ? value.toLowerCase() : value;
  });

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue);
  };
  return (
    <select
      className={`px-4 py-2 outline-none border-none rounded-md bg-blue-500 text-white cursor-pointer ${className}`}
      onChange={handleSelectChange}
    >
      {options.map((option, i) => (
        <option
          key={i}
          value={lowercaseValue}
          className="bg-white text-black w-fit"
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
