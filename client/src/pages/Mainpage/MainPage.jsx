import Buttons from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import SelectInput from "../../components/Input/SelectInput";
import { GoListUnordered } from "react-icons/go";
import { AiOutlineAreaChart } from "react-icons/ai";
import TableComponents from "../../components/Table/Table";
import ModalComponents from "../../components/Modal/Modal";
import { useAppContext } from "../../Context/Context";
import { useQuery } from "@tanstack/react-query";
import { getTransactionDetails } from "./MainPageApi";
import Analytics from "../../components/Analytics/Analytics";

const MainPage = () => {
  const { setShowModal, setEditable, viewData, setViewData } = useAppContext();

  const dateOptions = [
    { value: 7, option: "Last Week" },
    { value: 30, option: "Last Month" },
    { value: 365, option: "Last Year" },
  ];

  const selectOptions = dateOptions.map((item) => {
    return {
      value: item.value,
      option: item.option,
    };
  });
  const optionOption = selectOptions.map((option) => {
    return option.option;
  });
  const optionValue = selectOptions.map((option) => {
    return option.value;
  });

  // console.log("optionValue", optionValue);

  const incomeExpenseOption = ["All", "Income", "Expense"];

  const {
    isPending,
    error,
    data: transactionData,
    refetch,
  } = useQuery({
    queryKey: ["TransactionDetails"],
    queryFn: getTransactionDetails,
    // staleTime: 60000,
    enable: false,
 
  });

  const showAnalytics = () => {
    setViewData("analytics");
  };
  const showTable = () => {
    setViewData("table");
  };

  console.log("transactionData", transactionData);
  return (
    <>
      <Container>
        <div className="flex flex-col justify-center gap-5 items-center pt-20">
          <div className="flex  items-center justify-between py-4 px-1 border border-black w-full">
            <div className="center__items flex-col">
              <span className="text-base font-medium">Select Time</span>
              <SelectInput value={optionValue} options={optionOption} />
            </div>
            <div className="center__items flex-col">
              <span className="text-base font-medium">Select Type</span>
              <SelectInput
                value={incomeExpenseOption}
                options={incomeExpenseOption}
              />
            </div>
            <div className="center__items  rounded-md  mt-auto">
              <Buttons
                icon={<GoListUnordered className={`text-2xl font-bold `} />}
                className={`rounded-none !text-white !py-2 rounded-l-lg ${
                  viewData === "table" ? " bg-blue-300" : "bg-blue-500"
                }`}
                onClick={showTable}
              />
              <Buttons
                icon={<AiOutlineAreaChart className={`text-2xl font-bold`} />}
                className={`rounded-none !text-white !py-2 rounded-r-lg ${
                  viewData === "analytics" ? " bg-blue-300" : "bg-blue-500"
                }`}
                onClick={showAnalytics}
              />
            </div>
            <div className="mt-auto">
              <Buttons
                text="Add"
                className="center__items gap-2 bg-blue-500 !py-2"
                onClick={() => {
                  setEditable(null);
                  setShowModal(true);
                }}
              />
            </div>
          </div>
          {viewData === "table" ? (
            <div className="w-full">
              <TableComponents
                transactionData={transactionData}
                isPending={isPending}
              />
            </div>
          ) : (
            <div className="w-full">
              <Analytics
                transactionData={transactionData}
                isPending={isPending}
              />
            </div>
          )}
          <ModalComponents />
        </div>
      </Container>
    </>
  );
};

export default MainPage;
