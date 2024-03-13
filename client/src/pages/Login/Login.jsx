import { useForm } from "react-hook-form";
import Label from "../../components/Label/Label";
import InputComp from "../../components/Input/InputComp";
import Container from "../../components/Container/Container";
import { useMutation } from "@tanstack/react-query";
import loginData from "./LoginApi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { poster } from "../../components/ImagePath/Img";
import Buttons from "../../components/Button/Button";
import { message } from "antd";
import queryClient from "../../Query/Query";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const UserLogin = useMutation({
    mutationFn: (data) => {
      return loginData(data.email, data.password);
    },
    onSuccess: (data) => {
      message.success("User Login successfully");
      queryClient.invalidateQueries("TransactionDetails");

      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      setTimeout(() => {
        window.location.reload();
      }, 500);
      navigate("/");
    },
    onError: (error) => {
      message.error("Something went wrong");
      console.log("error: " + error.message);
    },
  });

  const submittedData = (data) => {
    UserLogin.mutate(data);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const visiblePasswordFn = () => setShowPassword((prev) => !prev);
  return (
    <>
      <section>
        <Container>
          <div className="flex  items-center justify-center p-4">
            <div className="bg-white z-10 flex h-full w-full rounded-xl">
              <figure className="w-full ">
                <img
                  src={poster}
                  alt=""
                  className=" object-cover object-center w-full h-full rounded-l-xl"
                />
              </figure>

              <div className=" w-full flex items-center justify-center">
                <div className=" p-6 rounded-xl flex flex-col gap-2 pl-3">
                  <div className="website-name">Expense Management System</div>
                  <div className="py-5">
                    <h1 className="headings text-center">Login</h1>

                    <form
                      onSubmit={handleSubmit(submittedData)}
                      className="flex flex-col gap-3"
                    >
                      <div>
                        <Label name="Email" sup={"*"} />
                        <InputComp
                          name="email"
                          type="email"
                          // required={true}
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
                          // required={true}
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
                        <Buttons type="submit" text="Login" />
                      </div>
                      <div>
                        <p className="flex gap-3 font-primary font-light text-[#252525]">
                          Don't have an Account?{" "}
                          <Link to="/signup">
                            <span className="font-bold text-[#0000FF] ">
                              Sign Up
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

export default Login;
