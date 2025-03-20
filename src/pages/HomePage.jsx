// import { useState, useRef } from "react";
// import heighlight from "../assets/image/heighlight.svg";

// import { Siderbar } from "../layouts/Siderbar";
// import logo from "../assets/logo/logo.svg";
// import { Button } from "../component/button/Button";

// const HomePage = () => {
//   const [participants, setParticipants] = useState([]);
//   const [winner, setWinner] = useState(null);
//   const [shuffling, setShuffling] = useState(false);
//   const [currentName, setCurrentName] = useState("");
//   const [fileLoading, setFileLoading] = useState(false);
//   const [fileData, setFileData] = useState(false);
//   const ref = useRef(null);

//   // Function to pick a random winner

//   const pickWinner = () => {
//     if (participants.length === 0 || shuffling) return;

//     setShuffling(true);
//     let counter = 0;
//     const shuffleInterval = setInterval(() => {
//       const randomIndex = Math.floor(Math.random() * participants.length);
//       setCurrentName(participants[randomIndex]);
//       counter++;

//       if (counter >= participants.length) {
//         // Stop shuffling after 15 times (~3 seconds)
//         clearInterval(shuffleInterval);
//         setTimeout(() => {
//           const finalWinner =
//             participants[Math.floor(Math.random() * participants.length)];
//           setWinner(finalWinner);
//           setShuffling(false);
//         }, 50);
//       }
//     }, 100); // Change name every 200ms

//     // setParticipants([]);

//     // Reset the file input after picking a winner
//     if (ref.current) {
//       ref.current.value = null; // Clear the file input value
//     }

//     setWinner(null);
//   };

//   return (
//     <div className="bg-[#FFFEE9]">
//       {/* {fileData && (
//         <div className="toast toast-top toast-center">
//           <div className="alert">
//             <span>
//               {" "}
//               🔄 Data Uploaded Successfully! ✅ You are now ready to run the
//               Lucky Draw! 🎉
//             </span>
//           </div>
//         </div>
//       )} */}

//       <div className="grid grid-cols-12 items-center content-center py-7">
//         <div className="col-span-10 h-screen bg-[#FFFEE9]  flex flex-col gap-7 items-center justify-center">
//           {winner === null && fileLoading && (
//             <div className="">
//               <span className="loading loading-ball loading-xs"></span>
//               <span className="loading loading-ball loading-sm"></span>
//               <span className="loading loading-ball loading-md"></span>
//               <span className="loading loading-ball loading-lg"></span>
//               <span className="loading loading-ball loading-xl"></span>
//             </div>
//           )}
//           <h1 className="text-4xl font-bold  font-agrandir ">
//             🏆 Lucky Draw <mark className="highlight">Winner Announcement</mark>{" "}
//             🎉
//             {/* <img src={heighlight} alt="" className="absolute z-20"/> */}
//           </h1>
//           <p className="w-[70%] font-light text-sm text-col text-center  font-poppins">
//             🚗 The moment you've been waiting for is here! We are thrilled to
//             announce the lucky winner of our InDrive Lucky Draw! 🎟️✨
//           </p>
//           <img src={logo} className=" w-50" alt="Logo Image" />

//           <div
//             className={`flex items-center ${
//               winner ? "" : "border-2"
//             } w-[70%] h-[300px] `}
//           >
//             {participants.length > 0 && (
//               <div>
//                 <p className="mb-2">
//                   Total Participants: {participants.length}
//                 </p>
//                 <div className="overflow-auto h-[200px]">
//                   {participants.map((data, index) => {
//                     return <p key={index}>{data}</p>;
//                   })}
//                 </div>
//               </div>
//             )}
//             {shuffling && (
//               <div className="mt-4 text-lg font-bold animate-bounce text-red-500">
//                 🔄 {currentName} 🔄
//               </div>
//             )}

//             {winner && (
//               <div className="mt-12 flex flex-col gap-4 items-center">
//                 <h2 className="text-4xl text-primary font-bold  text-center font-agrandir ">
//                   🎉 <mark className="highlight">Congratulations</mark>{" "}
//                   <span className="text-black">{winner}</span>
//                 </h2>
//                 <span className=" text-black text-2xl font-medium underline">
//                   You Are the Lucky Winner! 🏆🚗
//                 </span>
//                 <p className="text-center">
//                   We are thrilled to announce that you have been selected as the
//                   winner of the InDrive Lucky Draw! 🎟️✨
//                 </p>
//                 <p className="text-center text-3xl font-poppins font-bold">
//                   Your Prize
//                 </p>
//               </div>
//             )}
//           </div>
//           <Button onClick={pickWinner} shuffling={shuffling} winner={winner} />

//           <select
//             defaultValue="Server location"
//             className="select select-neutral"
//           >
//             <option disabled={true}>Server location</option>
//             <option>North America</option>
//             <option>EU west</option>
//             <option>South East Asia</option>
//           </select>
//         </div>
//         <div className="col-span-2 h-full flex items-center">
//           <Siderbar
//             participants={participants}
//             setParticipants={setParticipants}
//             winner={winner}
//             setWinner={setWinner}
//             shuffling={shuffling}
//             setShuffling={setShuffling}
//             currentName={currentName}
//             setCurrentName={setCurrentName}
//             pickWinner={pickWinner}
//             ref={ref}
//             setFileLoading={setFileLoading}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;



import { useState, useRef } from "react";
import heighlight from "../assets/image/heighlight.svg";
import { Siderbar } from "../layouts/Siderbar";
import logo from "../assets/logo/logo.svg";
import { Button } from "../component/button/Button";

const HomePage = () => {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);
  const [shuffling, setShuffling] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [fileData, setFileData] = useState(false);
  const ref = useRef(null);

  // Function to pick a random winner with smooth animation
  // const pickWinner = () => {
  //   if (participants.length === 0 || shuffling) return;

  //   setShuffling(true);
  //   let counter = 0;
  //   let shuffleInterval;

  //   const shuffleNames = () => {
  //     const randomIndex = Math.floor(Math.random() * 8);
  //     const randomIndex1 = Math.floor(Math.random() * 1);

  //     console.log(randomIndex1);
  //     setCurrentName(participants[randomIndex]);

  //     if (counter < participants.length) {
  //       counter++;
  //       shuffleInterval = requestAnimationFrame(shuffleNames);
  //     } else {
  //       clearInterval(shuffleInterval);
  //       setTimeout(() => {
  //         const finalWinner =
  //           participants[Math.floor(Math.random() * participants.length)];
  //         setWinner(finalWinner);
  //         setShuffling(false);
  //       }, 500);
  //     }
  //   };

  //   shuffleNames();

  //   // Reset the file input after picking a winner
  //   if (ref.current) {
  //     ref.current.value = null; // Clear the file input value
  //   }

  //   setWinner(null);
  // };

  // console.log(Math.floor(Math.random() * 8));




  // const pickWinner = () => {
  //   if (participants.length === 0 || shuffling) return;
  
  //   setShuffling(true);
  //   let counter = 0;
  //   const totalSpins = 1; // Fixed number of spins
  //   const intervalTime = 100; // Adjust speed (lower = faster)
  
  //   const shuffleInterval = setInterval(() => {
  //     const randomIndex = Math.floor(Math.random() * participants.length);
  //     setCurrentName(participants[randomIndex]);
  
  //     counter++;
  //     if (counter >= totalSpins) {
  //       clearInterval(shuffleInterval);
        
  //       setTimeout(() => {
  //         const finalWinner = participants[Math.floor(Math.random() * participants.length)];

          
  //         setWinner(finalWinner);
  //         setShuffling(false);
  //       }, 500);
  //     }
  //   }, intervalTime);
  
  //   // Reset the file input after picking a winner
  //   if (ref.current) {
  //     ref.current.value = null;
  //   }
  
  //   setWinner(null);
  // };
  
  

  const pickWinner = () => {
    if (participants.length < 10 || shuffling) return; // Ensure at least 10 participants
  
    setShuffling(true);
    let counter = 0;
    const totalSpins = 15; // Number of spins
    const intervalTime = 10; // Speed of shuffling
  
    const shuffleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      setCurrentName(participants[randomIndex]);
  
      counter++;
      if (counter >= participants.length) {
        clearInterval(shuffleInterval);
        setTimeout(() => {
          // Pick 10 unique winners
          const shuffledParticipants = [...participants].sort(() => 0.5 - Math.random());
          const finalWinners = shuffledParticipants.slice(0, 1);
          setWinner(finalWinners);
          setShuffling(false);
        }, 500);
      }
    }, intervalTime);
  
    // Reset the file input after picking winners
    if (ref.current) {
      ref.current.value = null;
    }
  
    setWinner(null);
  };
  
  return (
    <div className="bg-[#FFFEE9]">
      <div className="grid grid-cols-12 items-center content-center">
        <div className="col-span-10 h-screen bg-[#FFFEE9] flex flex-col gap-10 items-center justify-center">
          {winner === null && fileLoading && (
            <div className="">
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
              <span className="loading loading-ball loading-xl"></span>
            </div>
          )}
          <h1 className="text-5xl font-bold font-agrandir">
            🏆 Lucky Draw <mark className="highlight">Winner Announcement</mark> 🎉
          </h1>
          <p className="w-[70%] font-light text-sm text-col text-center font-poppins">
            🚗 The moment you've been waiting for is here! We are thrilled to
            announce the lucky winner of our InDrive Lucky Draw! 🎟️✨
          </p>
          <img src={logo} className="w-50" alt="Logo Image" />

          <div className={`${winner ? "" : "border-2"} w-[70%] h-[400px]`}>
            {shuffling && (
              <div className="mt-4 text-lg font-bold animate-pulse text-red-500">
                🔄 {currentName} 🔄
              </div>
            )}

            {winner && (
              <div className="mt-12 flex flex-col gap-4 items-center">
                <h2 className="text-4xl text-primary font-bold text-center font-agrandir">
                  🎉 <mark className="highlight">Congratulations</mark>{" "}
                  <span className="text-black">{winner}</span>
                </h2>
                <span className="text-black text-2xl font-medium underline">
                  You Are the Lucky Winner! 🏆🚗
                </span>
                <p className="text-center">
                  We are thrilled to announce that you have been selected as the
                  winner of the InDrive Lucky Draw! 🎟️✨
                </p>
                <p className="text-center text-3xl font-poppins font-bold">
                  Your Prize
                </p>
              </div>
            )}
          </div>
          <Button onClick={pickWinner} shuffling={shuffling} winner={winner} />
          
        </div>
        <div className="col-span-2 h-full flex items-center">
          <Siderbar
            participants={participants}
            setParticipants={setParticipants}
            winner={winner}
            setWinner={setWinner}
            shuffling={shuffling}
            setShuffling={setShuffling}
            currentName={currentName}
            setCurrentName={setCurrentName}
            pickWinner={pickWinner}
            ref={ref}
            setFileLoading={setFileLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
