import instance from "../../Axios/Instance";

const registerData = async (name, email, password) => {
  const userData = await instance.post("/users/register", {
    name: name,
    email: email,
    password: password,
  });
  const resp = await userData.data;
  console.log("resp", resp);

  return resp;
};
export default registerData;
