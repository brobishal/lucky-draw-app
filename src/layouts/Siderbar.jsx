import { useState, forwardRef } from "react";
import { Input } from "../component/input/Input";
import { Button } from "../component/button/Button";
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
  setWinnerPrizeDetail,
  winnerPrizeDetail,
  prize,
  noOfWinner,
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
        setWinner([]); // Reset winner when new file is uploaded

        // Reset file input value after processing the file
        // if (ref.current) {
        //   ref.current.value = null; // Clear the file input value
        // }
      };

      reader.readAsArrayBuffer(file); // Use readAsArrayBuffer instead of readAsBinaryString
    }
  };


  const handleChange = (e) =>{
    const {name, value} = e.target;
    setWinnerPrizeDetail({...winnerPrizeDetail, [name]:value})
    console.log(name, value);
    setWinner([]);

  }

  return (
    <div className="px-10 py-7 bg-dark-color h-full">
      <p className="text-2xl font-bold text-white">File upload from here</p>
      <Input onChange={handleFileChange} ref={ref} />
      <form className=" mt-10">
        <div className="mt-7">
          <label className="font-light text-lg text-white"> Select Prize</label>
          <select
            name="prize"
            onChange={handleChange}
            value={prize}
            defaultValue="Server location"
            className="select bg-white mt-2 border-2 text-black py-2 w-full rounded"
          >
            <option>Select Prize</option>
            <option>Bajaj Pulsar 150cc</option>
            <option>Galaxy A55 5G (8/256GB)</option>
            <option>Mi 32 HD Smart LED TV</option>
            <option>Ultima Nova Pro Smart watch</option>
            <option>Ultima Boost 20K Pro 20000mAh Powerbank</option>
            <option>Ultima Atom 192 Bluetooth Earbuds</option>
          </select>
        </div>

        <div className="mt-7">
          <label className="font-light text-lg text-white "> Select a no of winner</label>
          <input
          name="noOfWinner"
            type="number"
            onChange={handleChange}
            value={noOfWinner}
            className="input validator text-white focus:none rounded w-full mt-2 py-2"
            required
            placeholder="Type a number between 1 to 10"
            min="1"
            max="10"
            title="Must be between be 1 to 10"
            
          />
          <p className="validator-hint">Must be between be 1 to 10</p>
        </div>
      </form>
      <Button onClick={pickWinner} shuffling={shuffling} winner={winner} />

      
    </div>
  );
};
