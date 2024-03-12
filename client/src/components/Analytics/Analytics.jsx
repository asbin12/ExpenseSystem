import Container from "../Container/Container";
import Chart from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
const Analytics = ({ transactionData, isPending }) => {
  console.log(transactionData, "transactionData");
  const incomeFilter = transactionData
    .filter((item) => item.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenseFilter = transactionData
    .filter((item) => item.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  console.log("incomeFilter", incomeFilter);
  console.log("expenseFilter", expenseFilter);

  // const incomeFilter = allTransaction
  //   .filter((transaction) => transaction.type === "rentCollected")
  //   .reduce((acc, transaction) => acc + transaction.amount, 0);
  const IncomeFilterData = transactionData
    .filter((item) => item.type === "Expense")
    .map((item) => {
      return item.amount;
    });
  const expenseFilterData = transactionData
    .filter((item) => item.type === "Expense")
    .map((item) => {
      return item.amount;
    });

  return (
    <>
      <div>
        <Container>
          <div className="flex gap-4">
            <div className="border border-gray-200 bg-blue-100 text-black w-fit rounded-md flex flex-col font-primary text-base font-medium">
              <span className="border-b rounded-t-md border-white w-full bg-white text-center  text-black">
                Income:
              </span>
              <span className=" px-8  py-6"> $ {incomeFilter}</span>
            </div>
            <div className="border border-gray-200 bg-blue-100 text-black w-fit rounded-md flex flex-col font-primary text-base font-medium">
              <span className="border-b rounded-t-md border-white w-full bg-white text-center  text-black">
                Expense:
              </span>
              <span className=" px-8  py-6"> $ {expenseFilter}</span>
            </div>
          </div>

          <div className="flex gap-10 ">
            <div className="w-[300px] h-[300px] pt-[100px]">
              <Bar
                style={{ height: "100%" }}
                data={{
                  labels: ["Income Expense"],
                  datasets: [
                    {
                      label: "Income",
                      data: [incomeFilter],
                      backgroundColor: "rgba(75,192,192,0.2)",
                      borderColor: "rgba(75,192,192,1)",
                      borderWidth: 1,
                    },
                    {
                      label: "Expense",
                      data: [expenseFilter],
                      backgroundColor: "rgba(255,99,132,0.2)",
                      borderColor: "rgba(255,99,132,1)",
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
            <div className="w-[300px] h-[300px] ]">
              <Line
                style={{ height: "100%" }}
                data={{
                  labels: ["Income Expense"],
                  datasets: [
                    {
                      label: "Income",
                      data: [incomeFilter],
                      backgroundColor: "rgba(75,192,192,0.2)",
                      borderColor: "rgba(75,192,192,1)",
                      borderWidth: 1,
                    },
                    {
                      label: "Expense",
                      data: [expenseFilter],
                      backgroundColor: "rgba(255,99,132,0.2)",
                      borderColor: "rgba(255,99,132,1)",
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
            <div className="w-[300px] h-[400px] pt-5">
              <Doughnut
                data={{
                  labels: ["Income Expense"],
                  datasets: [
                    {
                      label: "Income",
                      data: [incomeFilter],
                      backgroundColor: "green",
                      borderColor: "rgba(75,192,192,1)",
                      borderWidth: 1,
                    },
                    {
                      label: "Expense",
                      data: [expenseFilter],
                      backgroundColor: "red",

                      borderColor: "rgba(255,99,132,1)",
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Analytics;
