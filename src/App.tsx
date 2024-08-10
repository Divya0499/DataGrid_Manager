import { useState } from "react";
import "./App.scss";
import { v4 as uuidv4 } from 'uuid';
import DonationDataTable from "./components/DonationDataTable";
import DonationForm from "./components/DonationForm";
import { DonationEntry, FormValues } from "./types/formTypes";
import donationData from "./donationData.json";

const App: React.FC = () => {
  const [data, setData] = useState<DonationEntry[]>(donationData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  
  const handleFormSubmit = (values: FormValues) => {
    if (selectedId) {
      setData((prevData) =>
        prevData.map((entry) =>
          entry.id === selectedId ? { ...values, id: selectedId } : entry
        )
      );
    } else {
      const newEntry = { ...values, id:uuidv4() };
      setData((prevData) => [...prevData, newEntry]);
    }
    setShowForm(false);
    setSelectedId(null);
  };

  const handleEdit = (id: number) => {
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
    </div>
  );
};

export default App;


