const Label = ({ name, className, sup }) => {
  return (
    <div>
      <label
        className={` text-base font-semibold -tracking-[0.02em] text-[#000000]  ${className}`}
      >
        {name} <span style={{ color: "#E03137" }}>{sup}</span>
      </label>
    </div>
  );
};

export default Label;
