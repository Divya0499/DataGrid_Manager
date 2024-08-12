import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import "./App.scss";
import { v4 as uuidv4 } from 'uuid';
import DonationDataTable from "./components/DonationDataTable";
import DonationForm from "./components/DonationForm";
import { FormValues } from "./types/formTypes";
import donationData from "./donationData.json";

const App: React.FC = () => {
  const [data, setData] = useState<FormValues[]>(donationData);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleFormSubmit = (values: FormValues) => {
    if (selectedId) {
      setData((prevData) =>
        prevData.map((entry) =>
          entry?.id === selectedId ? { ...values, id: selectedId } : entry
        )
      );
      toast.success("Data updated successfully");

    } else {
      const newEntry = { ...values, id:uuidv4() };
      setData((prevData) => [...prevData, newEntry]);
      toast.success("Data added successfully");

    }
    setShowForm(false);
    setSelectedId(null);
  };

  const handleEdit = (id: string) => {
    setSelectedId(id);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedId(null);
    setShowForm(true);
  };

  return (
    <div className="appContainer">
      <h1>{showForm?"Donation Form":"Donation Data Table"}</h1>
      {showForm ? (
        <DonationForm
          onSubmit={handleFormSubmit}
          initialValues={
            selectedId
              ? data.find((entry) => entry.id === selectedId) || undefined
              : undefined
          }
        />
      ) : (
        <DonationDataTable
          data={data}
          setData={setData}
          onEdit={handleEdit}
          onAdd={handleAdd}
        />
      )}
       <ToastContainer 
        theme="colored"
        autoClose={1000}
        hideProgressBar={true}
        closeButton={false}
        newestOnTop/>
    </div>
  );
};

export default App;


