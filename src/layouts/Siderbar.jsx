import { useState, forwardRef } from "react";
import { Input } from "../component/input/Input";

import * as XLSX from "xlsx";

// Use forwardRef to forward the ref from parent to child

export const Siderbar = ({
  participants,
  setParticipants,
  winner,
  setWinner,
  shuffling,
  setShuffling,
  currentName,
  setCurrentName,
  pickWinner,
  setFileLoading,
  ref,
}) => {
  // const [participants, setParticipants] = useState([]);
  // const [winner, setWinner] = useState(null);
  // const [shuffling, setShuffling] = useState(false);
  // const [currentName, setCurrentName] = useState("");

  // function to hanlde upload file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileLoading(true);
    }

    if (file) {
      const reader = new FileReader();

      //     reader.onload = (event) => {
      //       const workBook = XLSX.read(event.target.result, { type: "array" }); // Use 'array' instead of 'binary'
      //       const sheetName = workBook.SheetNames[0]; // Get the name of the first sheet
      //       const sheet = workBook.Sheets[sheetName]; // Get the sheet object
      //       const sheetData = XLSX.utils.sheet_to_json(sheet, { defval: "" }); // Convert the sheet data to JSON
      //       console.log("This is sheet", sheetData);

      //         // Check if the sheet is empty
      // if (!sheetData || sheetData.length === 0) {
      //   console.error("Excel sheet is empty or incorrectly formatted.");
      //   setParticipants([]);
      //   return;
      // }

      //       // assuming the first column contains name or ids

      //       const firstColumnKey = Object.keys(sheetData[0]); // Get first column name / Ensure data[0] exists
      //       console.log(firstColumnKey);
      //       const participantList = sheetData.map((row) => row[firstColumnKey]);
      //       console.log(participantList);

      //       setParticipants(participantList); // Store the data in the state
      //       setWinner(null); // Reset winner when new file is uploaded
      //     };

      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const data = XLSX.utils.sheet_to_json(sheet, { defval: "" }); // Prevents undefined values
        console.log("json data", data);
        // Check if `data` is empty
        if (!Array.isArray(data) || data.length === 0) {
          console.error("❌ Excel sheet is empty or improperly formatted.");
          setParticipants([]); // Reset state
          return;
        }

        // Get first column key safely
        const firstColumnKey = Object.keys(data[0])[0];
        console.log("first column", firstColumnKey);

        // Extract only the first column
        const participantList = data.map((item) => item[firstColumnKey]);
        console.log(participantList);

        setParticipants(participantList);
        setWinner(null); // Reset winner when new file is uploaded

        // Reset file input value after processing the file
        // if (ref.current) {
        //   ref.current.value = null; // Clear the file input value
        // }
      };

      reader.readAsArrayBuffer(file); // Use readAsArrayBuffer instead of readAsBinaryString
    }
  };

  return (
    <div>
      <p className="text-2xl font-bold">File upload from here</p>
      <Input onChange={handleFileChange} ref={ref} />
      <form className=" mt-10">
        <label className="font-bold text-2xl"> Select Prize</label>
        <select
          defaultValue="Server location"
          className="select bg-white mt-2 border-2 border-primary-color"
        >
          <option disabled={true}>Server location</option>
          <option>North America</option>
          <option>EU west</option>
          <option>South East Asia</option>
        </select>
      </form>

      {/* <p>{excelData && excelData.map((data, index) =>{
        <p key={index}>
          {
            Object.values(data).map((value, index)=>{
              <p key={index}>{value}</p>
            })
          }
        </p>
       
      })}</p> */}

      {/* Displaying the Excel data as a table if it's loaded

      {participants.length > 0 && (
        <div>
          <p className="mb-2">Total Participants: {participants.length}</p>
          <button
            onClick={pickWinner}
            disabled={shuffling || winner !== null} 
            className={`px-4 py-2 rounded ${winner || shuffling ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
            {shuffling ? "Shuffling a name": "Pick a Winner"}
          </button>
        </div>
      )}
      {shuffling && (
        <div className="mt-4 text-xl font-bold animate-bounce text-red-500">
          🔄 {currentName} 🔄
        </div>
      )}

      {winner && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400">
          <h2 className="text-xl font-bold">🎉 Winner: {winner} 🎉</h2>
        </div>
      )} */}
    </div>
  );
};
