import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../Context/Context";
import { Button, Input, Skeleton, Space, Table, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import Buttons from "../Button/Button";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { deleteExpenseDetails } from "../../pages/Mainpage/MainPageApi";
import queryClient from "../../Query/Query";

const TableComponents = ({ transactionData, isPending, refetch }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { currentPage, setCurrentPage, setShowModal, setEditable } =
    useAppContext();
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactionData
    ? transactionData.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handlePageChange = (page) => {
    queryClient.invalidateQueries("TransactionDetails");
    setCurrentPage(page);
  };

  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className="bg-blue-500 text-white"
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date", "Date"),
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",

      key: "amount",
      ...getColumnSearchProps("amount", "Amount"),
    },
    {
      title: "Types",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type", "Type"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category", "Category"),
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
      ...getColumnSearchProps("reference", "Reference"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description", "Description"),
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div
          className={`flex rounded-lg ${
            record.type === "Income"
              ? "border-r-4 border-green-500 "
              : "border-r-4 border-red-500 h-full"
          }`}
        >
          <Buttons
            icon={<FiEdit className="text-2xl font-bold" />}
            className="rounded-none !bg-transparent !text-green-500 !py-2 !pl-0 rounded-l-lg "
            onClick={() => handleEdit(record)}
          />
          <Buttons
            icon={<MdDelete className="text-2xl font-bold " />}
            className="rounded-none !bg-transparent !text-red-500 !py-2 !pl-0  rounded-r-lg"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  const ExpenseDelete = useMutation({
    mutationFn: (record) => {
      return deleteExpenseDetails(record);
    },
    onSuccess: () => {
      message.success("Details deleted successfully");
      const remainingDataCount = transactionData.length - 1;
      if (remainingDataCount % 5 === 0) {
        queryClient.invalidateQueries("TransactionDetails");
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    },
    onError: (error) => {
      console.error("Error:", error);
      message.error("Something went wrong");
    },
  });

  const handleDelete = (record) => {
    ExpenseDelete.mutate(record);
  };

  const handleEdit = (editRecord) => {
    setShowModal(true);
    setEditable(editRecord);
  };
  // useEffect(() => {
  //   queryClient.invalidateQueries("TransactionDetails");
  //   refetch();
  // }, [currentPage]);
  // history.replace(window.location.pathname);

  return (
    <>
      {isPending ? (
        <Skeleton />
      ) : (
        <div className="">
          <Table
            key={transactionData.length}
            columns={columns}
            dataSource={currentItems}
            responsive={true}
            // loading={isPending}
            pagination={{
              current: currentPage,
              pageSize: itemsPerPage,
              total: transactionData?.length,
              onChange: handlePageChange,
            }}
          />
        </div>
      )}
    </>
  );
};

export default TableComponents;

{
  /* {tableBody.map((item, i) => (
              <td key={i} className="p-2 text-left">
                {item}

                <button className="pr-2">{item.edit}</button>
                <button>{item.delete}</button>
              </td>
            ))} */
}

{
  /* <td className="p-2 text-left">Name</td> */
}
