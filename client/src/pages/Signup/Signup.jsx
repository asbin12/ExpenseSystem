import Label from "../../components/Label/Label";
import InputComp from "../../components/Input/InputComp";
import Buttons from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import { useForm } from "react-hook-form";
import registerData from "./SignupApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { poster } from "../../components/ImagePath/Img";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const UserRegister = useMutation({
    mutationFn: (data) => {
      return registerData(data.name, data.email, data.password);
    },
    onSuccess: () => {
      message.success("User registered successfully");
      navigate("/login");
    },
    onError: (error) => {
      message.error(`User already exists please login`);
      console.log(error);
    },
  });
  const submittedData = (data) => {
    UserRegister.mutate(data);
  };

  const [showPassword, setShowPassword] = useState(false);
  const visiblePasswordFn = () => setShowPassword((prev) => !prev);
  return (
    <>
      <section>
        <Container>
          <div className="flex items-center justify-center  p-4">
            <div className="bg-white z-10 flex h-full w-full rounded-xl">
              <figure className=" !hidden sm:!flex pr-2 sm:pt-20 lg:pt-0">
                <img
                  src={poster}
                  alt=""
                  className="lg:w-full sm:w-full sm:object-cover lg:object-cover  w-full h-full"
                />
              </figure>

              <div className=" w-full flex items-center justify-center">
                <div className="  p-6 rounded-xl flex flex-col gap-2 pl-3">
                  <div className="website-name">Expense Management System</div>
                  <div className="py-5">
                    <h1 className="headings text-center">Get Started</h1>
                    <form
                      onSubmit={handleSubmit(submittedData)}
                      className="flex flex-col lg:w-full sm:2/4 w-full"
                    >
                      <div>
                        <Label name="Name" sup={"*"} />
                        <InputComp
                          name="name"
                          type="text"
                          required={true}
                          placeholder="enter your name"
                          register={register}
                          errors={errors}
                        />
                      </div>
                      <div>
                        <Label name="Email" sup={"*"} />
                        <InputComp
                          name="email"
                          type="email"
                          required={true}
                          placeholder="enter your email"
                          register={register}
                          errors={errors}
                        />
                      </div>
                      <div className="relative">
                        <Label name="Password" sup={"*"} />
                        <InputComp
                          name="password"
                          type="password"
                          required={true}
                          placeholder="enter your password"
                          register={register}
                          errors={errors}
                          showPassword={showPassword}
                          visiblePasswordFn={visiblePasswordFn}
                        >
                          <button
                            className="outline-none border-none bg-none pt-1 "
                            type="button"
                          >
                            {showPassword ? <FiEye /> : <FiEyeOff />}
                          </button>
                        </InputComp>
                      </div>
                      <div className="pt-4 pb-4">
                        <Buttons type="submit" text="Sign Up" />
                      </div>
                      <div>
                        <p className="flex gap-3 font-primary font-light text-[#252525]">
                          Already have an Account ?{" "}
                          <Link to="/login">
                            <span className="font-bold text-[#0000FF] ">
                              Login
                            </span>
                          </Link>{" "}
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Signup;
