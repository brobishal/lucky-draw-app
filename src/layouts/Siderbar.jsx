// import { useState, forwardRef } from "react";
// import { Input } from "../component/input/Input";
// import { Button } from "../component/button/Button";
// import * as XLSX from "xlsx";

// // Use forwardRef to forward the ref from parent to child

// export const Siderbar = ({
//   participants,
//   setParticipants,
//   winner,
//   setWinner,
//   shuffling,
//   setShuffling,
//   currentName,
//   setCurrentName,
//   pickWinner,
//   setWinnerPrizeDetail,
//   winnerPrizeDetail,
//   prize,
//   noOfWinner,
//   ref,
// }) => {
//   // const [participants, setParticipants] = useState([]);
//   // const [winner, setWinner] = useState(null);
//   // const [shuffling, setShuffling] = useState(false);
//   // const [currentName, setCurrentName] = useState("");

//   // function to hanlde upload file
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const workbook = XLSX.read(event.target.result, { type: "array" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];

//         // Convert sheet to JSON
//         const data = XLSX.utils.sheet_to_json(sheet, { defval: "" }); // Prevents undefined values
//         console.log("json data", data);
//         // Check if `data` is empty
//         if (!Array.isArray(data) || data.length === 0) {
//           console.error("❌ Excel sheet is empty or improperly formatted.");
//           setParticipants([]); // Reset state
//           return;
//         }

//         // Get first column key safely
//         const firstColumnKey = Object.keys(data[0])[0];
//         console.log("first column", firstColumnKey);

//         // Extract only the first column
//         const participantList = data.map((item) => item[firstColumnKey]);
//         console.log(participantList);

//         setParticipants(participantList);
//         setWinner([]); // Reset winner when new file is uploaded

//         // Reset file input value after processing the file
//         // if (ref.current) {
//         //   ref.current.value = null; // Clear the file input value
//         // }
//       };

//       reader.readAsArrayBuffer(file); // Use readAsArrayBuffer instead of readAsBinaryString
//     }
//   };

//   const handleChange = (e) =>{
//     const {name, value} = e.target;
//     setWinnerPrizeDetail({...winnerPrizeDetail, [name]:value})
//     console.log(name, value);
//     setWinner([]);

//   }

//   return (
//     <div className="px-10 py-7 bg-dark-color h-full">
//       <p className="text-2xl font-bold text-white">File upload from here</p>
//       <Input onChange={handleFileChange} ref={ref} />
//       <form className=" mt-10">
//         <div className="mt-7">
//           <label className="font-light text-lg text-white"> Select Prize</label>
//           <select
//             name="prize"
//             onChange={handleChange}
//             value={prize}
//             defaultValue="Server location"
//             className="select bg-white mt-2 border-2 text-black py-2 w-full rounded"
//           >
//             <option>Select Prize</option>
//             <option>Bajaj Pulsar 150cc</option>
//             <option>Galaxy A55 5G (8/256GB)</option>
//             <option>Mi 32 HD Smart LED TV</option>
//             <option>Ultima Nova Pro Smart watch</option>
//             <option>Ultima Boost 20K Pro 20000mAh Powerbank</option>
//             <option>Ultima Atom 192 Bluetooth Earbuds</option>
//           </select>
//         </div>

//         <div className="mt-7">
//           <label className="font-light text-lg text-white "> Select a no of winner</label>
//           <input
//           name="noOfWinner"
//             type="number"
//             onChange={handleChange}
//             value={noOfWinner}
//             className="input validator text-white focus:none rounded w-full mt-2 py-2"
//             required
//             placeholder="Type a number between 1 to 10"
//             min="1"
//             max="10"
//             title="Must be between be 1 to 10"

//           />
//           <p className="validator-hint">Must be between be 1 to 10</p>
//         </div>
//       </form>
//       <Button onClick={pickWinner} shuffling={shuffling} winner={winner} />

//     </div>
//   );
// };

import { useState, forwardRef, useEffect } from "react";
import { Input } from "../component/input/Input";
import { Button } from "../component/button/Button";
import * as XLSX from "xlsx";

export const Siderbar = forwardRef(
  (
    {
      participants,
      setParticipants,
      winner,
      setWinner,
      shuffling,
      setShuffling,
      currentName,
      setCurrentName,
      pickWinner,
      setWinnerPrizeDetail,
      winnerPrizeDetail,

      prize,
      noOfWinner,
    },
    ref
  ) => {
    const [fileWorker, setFileWorker] = useState(null);

    useEffect(() => {
      return () => {
        if (fileWorker) {
          fileWorker.terminate();
        }
      };
    }, [fileWorker]);

    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // setFileLoading(true);
      setParticipants([]);
      setWinner([]);

      // Create a new worker for file processing
      const worker = new Worker(
        new URL("../workers/fileWorker.js", import.meta.url)
      );
      setFileWorker(worker);

      worker.postMessage({ file });

      worker.onmessage = (e) => {
        const { participantList, progress } = e.data;

        if (progress) {
          // Update progress if needed
          console.log(`Processed ${progress}% of file`);
        } else {
          setParticipants(participantList);
          setFileLoading(false);
        }
      };

      worker.onerror = (error) => {
        console.error("Worker error:", error);
        setFileLoading(false);
      };
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setWinnerPrizeDetail((prev) => ({
        ...prev,
        [name]: name === "noOfWinner" ? parseInt(value) : value,
      }));
      setWinner([]);
    };

    return (
      <div className="px-10 py-7 bg-dark-color h-full">
        {/*       
      {fileLoading && (
        <div className="mt-4 text-white">
          <p>Processing large file... This may take a moment</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      )} */}

        <form className="mt-10">
          <div className="mt-7">
            <label className="text-[22px] font-bold text-white">
              Upload Your Excel File
            </label>
            <Input
              onChange={handleFileChange}
              ref={ref}
              accept=".xlsx,.xls,.csv"
              // disabled={fileLoading}
            />
          </div>

          <div className="mt-7">
            <label className="font-light text-lg text-white">
              Select Prize
            </label>
            <select
              name="prize"
              onChange={handleChange}
              value={prize}
              className="select bg-white mt-2 border-2 text-black py-2 w-full rounded"
              // disabled={fileLoading || shuffling}
            >
              <option value="">Select Prize</option>
              <option value="Bajaj Pulsar 150cc">Bajaj Pulsar 150cc</option>
              <option value="Galaxy A55 5G (8/256GB)">
                Galaxy A55 5G (8/256GB)
              </option>
              <option value="Mi 32 HD Smart LED TV">
                Mi 32 HD Smart LED TV
              </option>
              <option value="Ultima Nova Pro Smart watch">
                Ultima Nova Pro Smart watch
              </option>
              <option value="Ultima Boost 20K Pro 20000mAh Powerbank">
                Ultima Boost 20K Pro 20000mAh Powerbank
              </option>
              <option value="Ultima Atom 192 Bluetooth Earbuds">
                Ultima Atom 192 Bluetooth Earbuds
              </option>
            </select>
          </div>

          <div className="mt-7">
            <label className="font-light text-lg text-white">
              Number of Winners
            </label>
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
              // disabled={fileLoading || shuffling}
            />
            <p className="validator-hint">Must be between 1 to 10</p>
          </div>
        </form>

        <Button
          onClick={pickWinner}
          shuffling={shuffling}
          winner={winner}
          // disabled={fileLoading || !prize || !noOfWinner || participants.length === 0}
        />

        <div className="mt-6 text-white">
          <p>Total Participants: {participants.length.toLocaleString()}</p>
          {/* {previousWinners.length > 0 && (
          <p>Previous Winners: {previousWinners.length}</p>
        )} */}
        </div>
      </div>
    );
  }
);
