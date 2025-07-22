import React, { useState } from "react";
import "./PreScriptionChecker.css";

import { FiMinusCircle } from "react-icons/fi";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const initialDrugOptions = [
  { value: "Paracetamol", label: "Paracetamol" },
  { value: "Ibuprofen", label: "Ibuprofen" },
  { value: "Aspirin", label: "Aspirin" },
  { value: "Clopidogrel", label: "Clopidogrel" },
];

const initialPatientOptions = [
  { value: "Hồ Minh Nhật", label: "Hồ Minh Nhật" },
  { value: "Phạm Thanh Bảo Ngân", label: "Phạm Thanh Bảo Ngân" },
  { value: "Phạm Nam An", label: "Phạm Nam An" },
];

const interactionRules = {
  "Paracetamol+Ibuprofen": "Tăng nguy cơ loét dạ dày",
  "Aspirin+Clopidogrel": "Tăng nguy cơ chảy máu",
};

const sharedStyle = {
  control: (base) => ({ ...base, minHeight: 38, borderRadius: 8 }),
};
const DropdownIndicator = () => null;
const IndicatorSeparator = () => null;

export default function PrescriptionChecker() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [drugOptions, setDrugOptions] = useState(initialDrugOptions);
  const [drugs, setDrugs] = useState([null, null, null]);
  const [alert, setAlert] = useState("");
  const [patientOptions, setPatientOptions] = useState(initialPatientOptions);

  const handleDrugChange = (idx, sel) => {
    const next = [...drugs];
    next[idx] = sel;
    setDrugs(next);
  };

  const handleCreateDrug = (idx, inputValue) => {
    const newOpt = { value: inputValue, label: inputValue };
    setDrugOptions((prev) => [...prev, newOpt]);
    handleDrugChange(idx, newOpt);
  };
  const createNewPatient = (inputValue) => {
    const newOpt = { value: inputValue, label: inputValue };
    setPatientOptions((prev) => [...prev, newOpt]);
    setSelectedPatient(newOpt);
  };

  const addDrugField = () => setDrugs([...drugs, null]);
  const removeDrugAt = (idx) =>
    drugs.length > 1 && setDrugs(drugs.filter((_, i) => i !== idx));

  const handleCheck = () => {
    let msg = "Safe";
    for (let i = 0; i < drugs.length; i++)
      for (let j = i + 1; j < drugs.length; j++) {
        const a = drugs[i]?.value,
          b = drugs[j]?.value;
        if (!a || !b) continue;
        if (interactionRules[`${a}+${b}`]) msg = interactionRules[`${a}+${b}`];
        if (interactionRules[`${b}+${a}`]) msg = interactionRules[`${b}+${a}`];
      }
    setAlert(msg);
  };

  return (
    <div className="container">
      <h2>New Prescription</h2>
      {/* Choose Patient  */}
      <div className="patient-wrapper">
        <CreatableSelect
          options={patientOptions}
          value={selectedPatient}
          onChange={setSelectedPatient}
          placeholder="Choose Patient"
          isClearable
          components={{ DropdownIndicator, IndicatorSeparator }}
          styles={sharedStyle}
        />
      </div>

      {/* List Medicine  */}
      {drugs.map((drug, idx) => (
        <div key={idx} className="input-wrapper">
          <CreatableSelect
            options={drugOptions}
            value={drug}
            onChange={(sel) => handleDrugChange(idx, sel)}
            onCreateOption={(val) => handleCreateDrug(idx, val)}
            placeholder={`Medicine ${idx + 1}`}
            isClearable
            components={{ DropdownIndicator, IndicatorSeparator }}
            styles={sharedStyle}
          />
          {/* Remove Medicine Button  */}
          <button
            className="remove-inside-btn"
            onClick={() => removeDrugAt(idx)}
            type="button"
          >
            <FiMinusCircle size={18} color="#9ca3af" />
          </button>
        </div>
      ))}
      {/* Add Medicine Button  */}
      <button className="add-btn" onClick={addDrugField}>
        ➕ Add Medicine
      </button>

      {/* Check Interaction  */}
      <div style={{ textAlign: "center" }}>
        <button className="check-btn" onClick={handleCheck}>
          Check Interaction
        </button>
      </div>

      {/* Alert  */}
      {alert && (
        <div
          className={`alert ${
            alert === "Safe" ? "alert-safe" : "alert-danger"
          }`}
        >
          {alert}
        </div>
      )}
    </div>
  );
}
