
import { useState } from "react";
import * as XLSX from "xlsx";

export const Siderbar = () => {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);
  const [shuffling, setShuffling] = useState(false);
  const [currentName, setCurrentName] = useState("");

  // Function to handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        const firstColumnKey = Object.keys(data[0])[0]; 
        const participantList = data.map((row) => row[firstColumnKey]);

        setParticipants(participantList);
        setWinner(null);
        setShuffling(false);
        setCurrentName(""); // Reset animation text
      };

      reader.readAsArrayBuffer(file);
    }
  };

  // Function to pick a random winner with animation
  const pickWinner = () => {
    if (participants.length === 0 || shuffling) return; 

    setShuffling(true);
    let counter = 0;
    const shuffleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      setCurrentName(participants[randomIndex]);
      counter++;

      if (counter >= 15) {  // Stop shuffling after 15 times (~3 seconds)
        clearInterval(shuffleInterval);
        setTimeout(() => {
          const finalWinner = participants[Math.floor(Math.random() * participants.length)];
          setWinner(finalWinner);
          setShuffling(false);
        }, 500);
      }
    }, 200); // Change name every 200ms

    setParticipants([]);
  };

  return (
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold mb-4">🎉 Raffle Draw 🎉</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="mb-4 border p-2" />
      
      {participants.length > 0 && (
        <div>
          <p className="mb-2">Total Participants: {participants.length}</p>
          <button 
            onClick={pickWinner} 
            disabled={shuffling || winner} 
            className={`px-4 py-2 rounded ${shuffling || winner ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          >
            {shuffling ? "Shuffling..." : "Pick a Winner"}
          </button>
        </div>
      )}

      {shuffling && (
        <div className="mt-4 text-xl font-bold animate-bounce text-red-500">
          🔄 {currentName} 🔄
        </div>
      )}

      {winner && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-xl font-bold">
          🎊 Winner: {winner} 🎊
        </div>
      )}
    </div>
  );
};
