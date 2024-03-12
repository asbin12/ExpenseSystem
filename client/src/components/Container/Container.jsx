const Container = ({ children, className }) => {
  return (
    <div className={`max-w-screen-xl mx-auto w-[100%] py-10 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
