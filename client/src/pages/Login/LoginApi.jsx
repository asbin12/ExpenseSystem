import instance from "../../Axios/Instance";

const loginData = async (email, password) => {
  const userData = await instance.post("/users/login", {
    email: email,
    password: password,
  });
  const resp = await userData.data;
  console.log("resp", resp);
  return resp;
};
export default loginData;
