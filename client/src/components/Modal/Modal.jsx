import { useAppContext } from "../../Context/Context";
import { useMutation } from "@tanstack/react-query";
import {
  createExpenseDetails,
  editExpenseDetails,
} from "../../pages/Mainpage/MainPageApi";
import queryClient from "../../Query/Query";
import { Modal, message } from "antd";
import { useForm } from "react-hook-form";
import Label from "../Label/Label";
import InputComp from "../Input/InputComp";
import SelectType from "../Input/SelectIncomeType";
import Buttons from "../Button/Button";

const ModalComponents = () => {
  const { showModal, setShowModal, editable, setEditable, setType } =
    useAppContext();

  const expenseIncomeType = ["Expense", "Income"];

  const ExpenseDetails = useMutation({
    mutationFn: (transactionData) => {
      return createExpenseDetails(transactionData);
    },
    onSuccess: () => {
      setShowModal(false);
      queryClient.invalidateQueries("TransactionDetails");
      message.success("Expense Details Added");
      reset();
    },
    onError: (error) => {
      console.error("Error:", error);
      message.error("Something went wrong");
    },
  });
  const EditExpense = useMutation({
    mutationFn: (transactionEdit) => {
      return editExpenseDetails(transactionEdit.data, transactionEdit.id);
    },
    onSuccess: () => {
      setShowModal(false);
      queryClient.invalidateQueries("TransactionDetails");
      message.success("Expense Details Updated");
      reset();
    },
  });

  const onSubmitted = (transactionData) => {
    if (editable) {
      const transactionEdit = {
        id: editable._id,
        data: transactionData,
      };
      EditExpense.mutate(transactionEdit);
    } else {
      setType(transactionData.selectType);
      ExpenseDetails.mutate(transactionData);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Modal
        title={editable ? "Edit Expense Details" : "Add Expense Details"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditable(null);
          {
            editable ? reset() : null;
          }
        }}
        destroyOnClose={true}
        footer={false}
      >
        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="flex flex-col gap-1"
        >
          <div>
            <Label name="Amount" sup={"*"} />
            <InputComp
              type="text"
              name="amount"
              defaultValue={editable ? editable.amount : ""}
              register={register}
              placeholder="Enter the amount"
              errors={errors}
              className="!px-4 !py-2"
            />
          </div>
          <div className="">
            <Label name="Type" />
            <SelectType
              className="w-full"
              options={expenseIncomeType}
              register={register}
              defaultValue={editable ? editable.type : ""}
            />
          </div>

          <div>
            <Label name="Category" sup={"*"} />
            <InputComp
              type="text"
              name="category"
              defaultValue={editable ? editable.category : ""}
              register={register}
              placeholder="Enter a category, e.g., Salary/Food"
              errors={errors}
              className="!px-4 !py-2"
            />
          </div>

          <div>
            <Label name="Date" sup={"*"} />
            <InputComp
              type="date"
              name="date"
              defaultValue={editable ? editable.date.slice(0, 10) : ""}
              register={register}
              placeholder=""
              errors={errors}
              className="!px-4 !py-2"
            />
          </div>
          <div>
            <Label name="Reference" sup={"*"} />
            <InputComp
              type="text"
              name="reference"
              defaultValue={editable ? editable.reference : ""}
              register={register}
              placeholder="e.g., pizza for food"
              errors={errors}
              className="!px-4 !py-2"
            />
          </div>
          <div>
            <Label name="Description" sup={"*"} />
            <InputComp
              type="text"
              name="description"
              defaultValue={editable ? editable.description : ""}
              register={register}
              placeholder="Enter description"
              errors={errors}
              className="!px-4 !py-2"
            />
          </div>

          <div className="flex justify-end">
            <Buttons type="submit" className="!w-full !px-4 !py-2">
              {editable ? "Update" : "Save"}
            </Buttons>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalComponents;
