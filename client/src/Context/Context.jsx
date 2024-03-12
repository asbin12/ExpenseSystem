import { createContext, useContext, useState } from "react";

// Create a context with default values
const AppContext = createContext({
  showModal: false,
  setShowModal: () => {},
  loading: false,
  setLoading: () => {},
  allTransaction: [],
  setAllTransaction: () => {},
  frequency: "7",
  setFrequency: () => {},
  selectedDate: [],
  setSelectedDate: () => {},
  type: "all",
  setType: () => {},
  editable: "",
  setEditable: () => {},
  viewData: "table",
  setViewData: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});

// Create a provider component
export const AppProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [editable, setEditable] = useState(null);
  const [viewData, setViewData] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);

  // Create an object with the state values and setter functions
  const contextValue = {
    showModal,
    setShowModal,
    loading,
    setLoading,
    allTransaction,
    setAllTransaction,
    frequency,
    setFrequency,
    selectedDate,
    setSelectedDate,
    type,
    setType,
    editable,
    setEditable,
    viewData,
    setViewData,
    currentPage,
    setCurrentPage,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Create a custom hook to access the context values
export const useAppContext = () => {
  return useContext(AppContext);
};
