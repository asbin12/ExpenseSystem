import transactionModel from "../models/transactionModel.js";

const getAllTransaction = async (req, res) => {
  try {
    const { userid } = req.query;

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
