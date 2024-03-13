import Container from "../Container/Container";
import { Statistic, Progress, Skeleton } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";

const Analytics = ({ transactionData, isPending }) => {
  const totalIncome = transactionData
    .filter((transaction) => transaction.type === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactionData
    .filter((transaction) => transaction.type === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const pieChartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  const combinedChartData = transactionData.map((transaction) => ({
    date: new Date(transaction.date).toLocaleDateString(),
    amount: transaction.amount,
    type: transaction.type,
  }));

  const incomeData = combinedChartData.filter((item) => item.type === "Income");
  console.log(incomeData);
  const expenseData = combinedChartData.filter(
    (item) => item.type === "Expense"
  );
  const total = totalIncome + totalExpense;
  const incomePercentage =
    total > 0 ? (totalIncome / total) * 100 : totalIncome > 0 ? 100 : 0;
  const expensePercentage =
    total > 0 ? (totalExpense / total) * 100 : totalExpense > 0 ? 100 : 0;

  const mergedData = [...incomeData, ...expenseData].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const uniqueDates = [...new Set(combinedChartData.map((item) => item.date))];

  return (
    <>
      {isPending ? (
        <Skeleton />
      ) : (
        <>
          <Container>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-start gap-7 border border-blue-300 bg-transparent z-10 w-fit p-4 rounded-md">
                <div>
                  <Statistic
                    title="Total Income"
                    value={`${totalIncome}` || "$ 0"}
                    className="pb-4 font-base font-medium font-primary"
                  />
                  <Progress
                    percent={incomePercentage.toFixed(2) || "0%"}
                    type="circle"
                    strokeColor="#82ca9d"
                  />
                </div>
                <div>
                  <Statistic
                    title="Total Expense"
                    value={` ${totalExpense}` || "$ 0"}
                    className="pb-4 font-base font-medium font-primary"
                  />
                  <Progress
                    percent={expensePercentage.toFixed(2) || "0%"}
                    type="circle"
                    strokeColor="#FF6347"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <PieChart width={500} height={300}>
                  {/* Outer Pie representing the donut ring */}
                  <Pie
                    data={[{ value: 1 }]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="transparent"
                    label={false}
                  />
                  {/* Inner Pie representing the filled portion */}
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40} // Set inner radius for donut shape
                    fill="#8884d8"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#82ca9d" : "#FF6347"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>

              <div>
                <LineChart
                  width={500}
                  height={300}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" ticks={uniqueDates} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    data={mergedData.filter((item) => item.type === "Income")} // Filter income data
                    dataKey="amount"
                    stroke="#82ca9d"
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    data={mergedData.filter((item) => item.type === "Expense")} // Filter expense data
                    dataKey="amount"
                    stroke="#FF6347"
                    name="Expense"
                  />
                </LineChart>
              </div>
            </div>
            <div className="flex justify-center items-center pt-4">
              <div>
                <BarChart
                  width={800}
                  height={400}
                  data={combinedChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" ticks={uniqueDates} />
                  <YAxis />
                  <Tooltip
                    content={({ payload, label, active }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0];
                        const type =
                          item.payload.type === "Income" ? "Income" : "Expense";
                        return (
                          <div
                            style={{
                              background: "#fff",
                              border: "1px solid #ccc",
                              padding: "10px",
                            }}
                          >
                            <p>Date: {label}</p>
                            <p>
                              {type}: {item.value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="amount" barSize={20} name="Income and Expenses">
                    {combinedChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.type === "Income" ? "#82ca9d" : "#FF6347"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </div>
              <div></div>
            </div>

            {/* <Row gutter={[16, 16]}>
              <Col span={12}></Col>
              <Col span={12}>
                <BarChart
                  width={500}
                  height={400}
                  data={combinedChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" ticks={uniqueDates} />
                  <YAxis />
                  <Tooltip
                    content={({ payload, label, active }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0];
                        const type =
                          item.payload.type === "Income" ? "Income" : "Expense";
                        return (
                          <div
                            style={{
                              background: "#fff",
                              border: "1px solid #ccc",
                              padding: "10px",
                            }}
                          >
                            <p>Date: {label}</p>
                            <p>
                              {type}: {item.value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="amount" barSize={20} name="Income and Expenses">
                    {combinedChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.type === "Income" ? "#82ca9d" : "#FF6347"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={24}>
              
              </Col>
            </Row> */}
          </Container>
        </>
      )}
    </>
  );
};

export default Analytics;
