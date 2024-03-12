import transactionModel from "../models/transactionModel.js";
import moment from "moment";

// Get all transactions
// const getAllTransaction = async (req, res) => {
//   try {
//     const { frequency, type, userid, startDate, endDate } = req.query;
//     console.log("Received Type:", type);

//     let dateFilter = {};

//     if (frequency !== "custom") {
//       dateFilter = {
//         date: {
//           $gt: moment().subtract(Number(frequency), "d").toDate(),
//         },
//       };
//     } else {
//       dateFilter = {
//         date: {
//           $gte: new Date(startDate),
//           $lte: new Date(endDate),
//         },
//       };
//     }

//     const transaction = await transactionModel.find({
//       ...dateFilter,
//       userid,
//       ...(type !== "all" && { type }),
//     });

//     res.status(200).json(transaction);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };
const getAllTransaction = async (req, res) => {
  try {
    const {userid} = req.query;

    const transactions = await transactionModel.find({
      userid,
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Edit transaction
const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Edit Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Add transaction
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};