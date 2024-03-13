import instance from "../../Axios/Instance";

const user = JSON.parse(localStorage.getItem("user"));

export const createExpenseDetails = async (data) => {
  const userData = await instance.post("/transaction/add-transaction", {
    userid: user._id,
    amount: data.amount,
    type: data.selectType,
    category: data.category,
    date: data.date,
    reference: data.reference,
    description: data.description,
  });
  const resp = await userData.data;
  return resp;
};

// export const getTransactionDetails = async (params) => {
//   const transactionData = await instance.get("/transaction/get-transaction", {
//     params,
//   });
//   const resp = await transactionData.data;
//   console.log("resp", resp);
//   return resp;
// };

export const getTransactionDetails = async () => {
  const response = await instance.get("/transaction/get-transaction", {
    params: {
      userid: user._id,
    },
  });
  return response.data;
};

export const deleteExpenseDetails = async (record) => {
  const deleteRequest = await instance.delete(
    `/transaction/delete-transaction`,
    {
      data: { transactionId: record._id },
    }
  );
};

export const editExpenseDetails = async (values, id) => {
  const response = await instance.put(
    `/transaction/edit-transaction`, // Assuming you need to include the transaction ID in the URL
    {
      payload: {
        ...values,
        user: user._id,
      },
      transactionId: id,
    }
  );

  const updatedData = await response.data;
  return updatedData;
};
// userid: user._id,
// amount: record.amount,
// type: record.selectType,
// category: record.category,
// date: record.date,
// reference: record.reference,
// description: record.description
