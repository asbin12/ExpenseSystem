const SelectType = ({ options, register, className, defaultValue }) => {
  return (
    <select
      className={`px-4 py-2 outline-none border-none rounded-md bg-blue-500 text-white ${className}`}
      {...register("selectType", { required: true })}
      defaultValue={defaultValue}
    >
      {options.map((item) => (
        <option key={item} value={item} className="bg-white text-black w-fit">
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectType;
