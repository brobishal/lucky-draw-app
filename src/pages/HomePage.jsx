// import { useState, useRef, useEffect } from "react";
// import heighlight from "../assets/image/heighlight.svg";
// import { Siderbar } from "../layouts/Siderbar";
// import logo from "../assets/logo/logo.svg";
// import { Button } from "../component/button/Button";
// import Confetti from "react-confetti";
// import dimonds from "../assets/image/dimonds.svg";
// import patterns1 from "../assets/image/patterns1.svg";
// import patterns2 from "../assets/image/patterns2.svg";
// import patterns3 from "../assets/image/patterns3.svg";
// import patterns4 from "../assets/image/patterns4.svg";

// // import { useWindowSize } from 'react-use';

// const defaultWinnerPriceDetail = {
//   prize: "",
//   noOfWinner: "",
// };

// const HomePage = () => {
//   const [participants, setParticipants] = useState([]);
//   const [winner, setWinner] = useState([]);
//   const [shuffling, setShuffling] = useState(false);
//   const [currentName, setCurrentName] = useState("");
//   const [fileLoading, setFileLoading] = useState(false);
//   const [fileData, setFileData] = useState(false);
//   const [winnerPrizeDetail, setWinnerPrizeDetail] = useState(
//     defaultWinnerPriceDetail
//   );
//   const [previousWinners, setPreviousWinners] = useState([]);

//   const ref = useRef(null);
//   console.log(previousWinners);
//   const { prize, noOfWinner } = winnerPrizeDetail;
//   // Function to shuffle the array (Fisher-Yates algorithm)
//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };

//   const pickWinner = () => {
//     if (participants.length < 10 || shuffling) return;

//     setShuffling(true);
//     let counter = 0;
//     const intervalTime = 1;

//     const shuffleInterval = setInterval(() => {
//       if (participants.length === 0) {
//         clearInterval(shuffleInterval);
//         setShuffling(false);
//         return;
//       }

//       const randomIndex = Math.floor(Math.random() * participants.length);
//       setCurrentName(participants[randomIndex]);

//       counter++;
//       if (counter >= 200) {
//         clearInterval(shuffleInterval);
//         setTimeout(() => {
//           const eligibleParticipants = participants.filter(
//             (item) => !previousWinners.includes(item)
//           );

//           if (eligibleParticipants.length === 0) {
//             setWinner(["No eligible participants left"]);
//             setShuffling(false);
//             return;
//           }

//           const shuffledParticipants = shuffleArray([...eligibleParticipants]);
//           console.log(shuffledParticipants);

//           let selectedWinners = [];

//           if (prize === "Bajaj Pulsar 150cc") {
//             const winnerIndex = Math.floor(
//               Math.random() * shuffledParticipants.length
//             );
//             selectedWinners = shuffledParticipants.splice(
//               winnerIndex,
//               noOfWinner
//             ); // Removes the winner
//           } else if (prize === "Galaxy A55 5G (8/256GB)") {
//             selectedWinners = shuffledParticipants.splice(0, noOfWinner);
//           } else if (prize === "Mi 32 HD Smart LED TV") {
//             selectedWinners = shuffledParticipants.splice(0, noOfWinner);
//           } else if (prize === "Ultima Nova Pro Smart watch") {
//             selectedWinners = shuffledParticipants.splice(0, noOfWinner);
//           } else if (prize === "Ultima Boost 20K Pro 20000mAh Powerbank") {
//             selectedWinners = shuffledParticipants.splice(0, noOfWinner);
//           } else if (prize === "Ultima Atom 192 Bluetooth Earbuds") {
//             selectedWinners = shuffledParticipants.splice(0, noOfWinner);
//           }

//           // Update state using function-based approach to ensure previous winners are included
//           setPreviousWinners((prev) => [...prev, ...selectedWinners]);
//           setWinner([...selectedWinners]); // ✅ Fix

//           setShuffling(false);
//         }, 1000);
//       }
//     }, intervalTime);
//   };

//   return (
//     <div className=" bg-[#FFFEE9]">
//       <div className=" grid grid-cols-10 items-center content-center">
//         <div className="relative col-span-8 h-screen bg-[#FFFEE9] flex flex-col gap-4 items-center justify-center">
//           {winner.length === 0 && fileLoading && (
//             <div className="">
//               <span className="loading loading-ball loading-xs"></span>
//               <span className="loading loading-ball loading-sm"></span>
//               <span className="loading loading-ball loading-md"></span>
//               <span className="loading loading-ball loading-lg"></span>
//               <span className="loading loading-ball loading-xl"></span>
//             </div>
//           )}
//           {/* <h1 className="text-2xl font-bold font-agrandir">
//             🏆 Lucky Draw <mark className="highlight">Winner Announcement</mark>{" "}
//             🎉
//           </h1> */}
//           <img src={logo} className="w-36" alt="Logo Image" />
//           <div>
//             <div className="relative flex items-center justify-start  bg-[#7150ff] rounded-4xl px-10 py-2">
//               <img src={dimonds} className="absolute w-10" alt="" />
//               <h1 className=" ml-14 text-4xl font-bold font-agrandir text-white ">
//                 Platinum Driver
//               </h1>
//             </div>
//           </div>
//           <span className=" text-3xl font-bold font-agrandir">Giveway</span>
//           <p className="w-[70%] font-light text-xs text-col text-center font-poppins">
//           The moment you've been waiting for is here! We are thrilled to announce the lucky winners🎟️✨
//           </p>

//           <div
//             className={`p-3 z-10 ${
//               winner.length > 0
//                 ? "rounded-4xl"
//                 : "relative flex flex-col items-center justify-center gap-7  rounded-4xl"
//             } w-[90%] h-[400px]  bg-[#7150ff]`}
//           >
//             <div className="flex items-center justify-center gap-7  w-full h-full border-2 border-dashed rounded-4xl p-2 border-primary-color">
//               <div className="flex items-center justify-center gap-7  w-full h-full overflow-auto rounded-4xl border-2 border-white bg-white ">
//                 <div>
//                   {participants.map((data, index) => {
//                     return <p key={index}></p>;
//                   })}
//                 </div>
//                 {/* shuffling &&  */}
//                 {shuffling && (
//                   <div className="mt-4 text-7xl font-bold animate-pulse text-[#7150ff]">
//                     {currentName}
//                   </div>
//                 )}

//                 {winner.length > 0 && (
//                   <div className="mt-12 flex flex-col gap-10 items-center">
//                     <h2 className="text-5xl text-primary font-bold text-center font-agrandir">
//                       🎉 <mark className="highlight ">Congratulations</mark> 🎉
//                     </h2>
//                     <ul
//                       className="flex flex-col"
//                     >
//                       {winner.map((w, index) => (
//                         <li
//                           key={index}
//                           className="list-decimal border-2 border-black px-2 text-black text-2xl font-medium"
//                         >
//                           {w}
//                         </li>
//                       ))}
//                     </ul>

//                     <p className="text-center text-4xl font-poppins font-bold bg-white px-4">
//                       <span className="text-primary">Your Prize</span>: {prize}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {/* <Button onClick={pickWinner} shuffling={shuffling} winner={winner} /> */}
//             {winner.length > 0 && <Confetti className="w-[80%] h-full" />}
//           </div>
//           <svg
//             version="1.1"
//             id="fi_60995"
//             xmlns="http://www.w3.org/2000/svg"
//             x="0px"
//             y="0px"
//             width="100px"
//             height="100px"
//             viewBox="0 0 255 255"
//             className="-mt-14"
//             // style="enableBackground:new 0 0 255 255;"
//           >
//             <g fill="#7150ff">
//               <g id="arrow-drop-down">
//                 <polygon points="0,63.75 127.5,191.25 255,63.75 		"></polygon>
//               </g>
//             </g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//             <g></g>
//           </svg>

//           <img
//             src={patterns1}
//             className="absolute w-lg  -right-52 -top-60"
//             alt=""
//           />
//           <img
//             src={patterns2}
//             className="absolute w-[300px] -left-20 -top-28"
//             alt=""
//           />
//           <img
//             src={patterns3}
//             className="absolute w-lg bottom-0 -left-60"
//             alt=""
//           />
//           <img
//             src={patterns4}
//             className="absolute w-[300px] -right-40 -bottom-0"
//             alt=""
//           />
//         </div>

//         <div className="col-span-2 h-full flex items-center z-50">
//           <Siderbar
//             participants={participants}
//             setParticipants={setParticipants}
//             winner={winner}
//             shuffling={shuffling}
//             setWinner={setWinner}
//             setShuffling={setShuffling}
//             currentName={currentName}
//             setCurrentName={setCurrentName}
//             pickWinner={pickWinner}
//             setFileLoading={setFileLoading}
//             setWinnerPrizeDetail={setWinnerPrizeDetail}
//             winnerPrizeDetail={winnerPrizeDetail}
//             prize={prize}
//             noOfWinner={noOfWinner}
//             ref={ref}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default HomePage;
// import { useState, useEffect, useRef } from "react";
// import Confetti from "react-confetti";
// import { Siderbar } from "../layouts/Siderbar";
// import logo from "../assets/logo/logo.svg";
// import dimonds from "../assets/image/dimonds.svg";

// const defaultWinnerPriceDetail = {
//   prize: "",
//   noOfWinner: "",
// };

// const HomePage = () => {
//   const [participants, setParticipants] = useState([]);
//   const [winner, setWinner] = useState([]);
//   const [shuffling, setShuffling] = useState(false);
//   const [currentName, setCurrentName] = useState("");
//   const [winnerPrizeDetail, setWinnerPrizeDetail] = useState(defaultWinnerPriceDetail);
//   const [previousWinners, setPreviousWinners] = useState([]);
//   const workerRef = useRef(null);

//   useEffect(() => {
//     workerRef.current = new Worker(new URL('../workers/worker.js', import.meta.url), { type: 'module' });

//     // Handle the worker's messages
//     workerRef.current.onmessage = (e) => {
//       console.log('Message from worker:', e.data);  // Log worker messages

//       const { action, winners, currentName } = e.data;
//       if (action === "shuffling") {
//         setCurrentName(currentName);
//       }

//       if (action === "winner") {
//         setWinner(winners);
//         setPreviousWinners((prev) => [...prev, ...winners]);
//         setShuffling(false);
//       }
//     };

//     return () => {
//       if (workerRef.current) {
//         workerRef.current.terminate();
//       }
//     };
//   }, []);

//   const { prize, noOfWinner } = winnerPrizeDetail;

//   const pickWinner = () => {
//     if (participants.length < 10 || shuffling) return; // Ensure enough participants and no ongoing shuffle

//     setShuffling(true);
//     console.log('Sending data to worker:', { participants, prize, noOfWinner });  // Debug message
//     workerRef.current.postMessage({ participants, prize, noOfWinner });  // Send message to worker
//   };

//   return (
//     <div className="bg-[#FFFEE9]">
//       <div className="grid grid-cols-10 items-center content-center">
//         <div className="relative col-span-8 h-screen bg-[#FFFEE9] flex flex-col gap-4 items-center justify-center">
//           {winner.length === 0 && shuffling && (
//             <div className="loading-container">
//               <span className="loading loading-ball loading-xs"></span>
//               <span className="loading loading-ball loading-sm"></span>
//               <span className="loading loading-ball loading-md"></span>
//               <span className="loading loading-ball loading-lg"></span>
//               <span className="loading loading-ball loading-xl"></span>
//             </div>
//           )}
//           <img src={logo} className="w-36" alt="Logo Image" />
//           <div>
//             <div className="relative flex items-center justify-start bg-[#7150ff] rounded-4xl px-10 py-2">
//               <img src={dimonds} className="absolute w-10" alt="" />
//               <h1 className="ml-14 text-4xl font-bold font-agrandir text-white">Platinum Driver</h1>
//             </div>
//           </div>
//           <span className="text-3xl font-bold font-agrandir">Giveway</span>
//           <p className="w-[70%] font-light text-xs text-col text-center font-poppins">
//             The moment you've been waiting for is here! We are thrilled to announce the lucky winners🎟️✨
//           </p>

//           <div className="p-3 z-10 w-[90%] h-[400px] bg-[#7150ff] rounded-4xl">
//             <div className="flex items-center justify-center gap-7 w-full h-full border-2 border-dashed rounded-4xl p-2 border-primary-color">
//               <div className="flex items-center justify-center gap-7 w-full h-full overflow-auto rounded-4xl border-2 border-white bg-white">
//                 {shuffling && (
//                   <div className="mt-4 text-7xl font-bold animate-pulse text-[#7150ff]">{currentName}</div>
//                 )}

//                 {winner.length > 0 && (
//                   <div className="mt-12 flex flex-col gap-10 items-center">
//                     <h2 className="text-5xl text-primary font-bold text-center font-agrandir">
//                       🎉 <mark className="highlight ">Congratulations</mark> 🎉
//                     </h2>
//                     <ul className="flex flex-col">
//                       {winner.map((w, index) => (
//                         <li key={index} className="list-decimal border-2 border-black px-2 text-black text-2xl font-medium">
//                           {w}
//                         </li>
//                       ))}
//                     </ul>

//                     <p className="text-center text-4xl font-poppins font-bold bg-white px-4">
//                       <span className="text-primary">Your Prize</span>: {prize}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {winner.length > 0 && <Confetti className="w-[80%] h-full" />}
//           </div>

//           {previousWinners.length > 0 && (
//             <div className="mt-8">
//               <h3 className="text-3xl font-bold">Previous Winners</h3>
//               <ul className="flex flex-col mt-4">
//                 {previousWinners.map((w, index) => (
//                   <li key={index} className="text-xl text-black font-medium">{w}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//         <div className="col-span-2 h-full flex items-center z-50">
//           <Siderbar
//             participants={participants}
//             setParticipants={setParticipants}
//             winner={winner}
//             shuffling={shuffling}
//             setWinner={setWinner}
//             setShuffling={setShuffling}
//             currentName={currentName}
//             setCurrentName={setCurrentName}
//             pickWinner={pickWinner}
//             setWinnerPrizeDetail={setWinnerPrizeDetail}
//             winnerPrizeDetail={winnerPrizeDetail}
//             prize={prize}
//             noOfWinner={noOfWinner}
//             ref={workerRef}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


import { useState, useRef, useEffect } from "react";
import heighlight from "../assets/image/heighlight.svg";
import { Siderbar } from "../layouts/Siderbar";
import logo from "../assets/logo/logo.svg";
import { Button } from "../component/button/Button";
import Confetti from "react-confetti";
import dimonds from "../assets/image/dimonds.svg";
import patterns1 from "../assets/image/patterns1.svg";
import patterns2 from "../assets/image/patterns2.svg";
import patterns3 from "../assets/image/patterns3.svg";
import patterns4 from "../assets/image/patterns4.svg";

const defaultWinnerPriceDetail = {
  prize: "",
  noOfWinner: "",
};

const HomePage = () => {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState([]);
  const [shuffling, setShuffling] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [winnerPrizeDetail, setWinnerPrizeDetail] = useState(defaultWinnerPriceDetail);
  const [previousWinners, setPreviousWinners] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [worker, setWorker] = useState(null);
  const containerRef = useRef(null);

  // Initialize web worker
  useEffect(() => {
    const newWorker = new Worker(new URL('../workers/drawWorker.js', import.meta.url));
    setWorker(newWorker);

    return () => {
      newWorker.terminate();
    };
  }, []);

  // Set confetti dimensions
  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, []);

  // Handle worker messages
  useEffect(() => {
    if (!worker) return;

    worker.onmessage = (e) => {
      if (e.data.type === 'winners') {
        const { winners } = e.data;
        setPreviousWinners(prev => [...prev, ...winners]);
        setWinner(winners);
        setShuffling(false);
      } else if (e.data.type === 'progress') {
        setCurrentName(e.data.name);
      }
    };

    return () => {
      worker.onmessage = null;
    };
  }, [worker]);

  const pickWinner = () => {
    if (participants.length < 10 || shuffling) return;

    setShuffling(true);
    setWinner([]);

    // Start the shuffling animation
    let counter = 0;
    const shuffleInterval = setInterval(() => {
      if (participants.length === 0) {
        clearInterval(shuffleInterval);
        setShuffling(false);
        return;
      }

      const randomIndex = Math.floor(Math.random() * participants.length);
      console.log(randomIndex);
      setCurrentName(participants[randomIndex]);

      counter++;
      if (counter >= 300) { // Reduced from 200 for better UX
        clearInterval(shuffleInterval);
        
        // Send data to web worker for processing
        worker.postMessage({
          type: 'draw',
          participants,
          noOfWinner: winnerPrizeDetail.noOfWinner,
          previousWinners,
          prize: winnerPrizeDetail.prize
        });
      }
    }, 30); // Faster interval for smoother animation
  };

  return (
    <div className="bg-[#FFFEE9]" ref={containerRef}>
      <div className="grid grid-cols-12 items-center content-center">
        <div className="relative col-span-9 h-screen bg-[#FFFEE9] flex flex-col gap-4 items-center justify-center">
          {fileLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="text-white text-2xl">
                Processing large file... Please wait
                <div className="mt-4 flex justify-center">
                  <div className="w-64 bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-600 h-4 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <img src={logo} className="w-36" alt="Logo" />
          <div>
            <div className="relative flex items-center justify-start bg-[#7150ff] rounded-4xl px-10 py-2">
              <img src={dimonds} className="absolute w-10" alt="" />
              <h1 className="ml-14 text-4xl font-bold font-agrandir text-white">
                Platinum Driver
              </h1>
            </div>
          </div>
          <span className="text-3xl font-bold font-agrandir">Giveaway</span>
          <p className="w-[70%] font-light text-xs text-col text-center font-poppins">
            The moment you've been waiting for is here! We are thrilled to announce the lucky winners🎟️✨
          </p>

          <div className={`p-3 z-10 ${
            winner.length > 0 ? "rounded-4xl" : "relative flex flex-col items-center justify-center gap-7 rounded-4xl"
          } w-[90%] h-[420px] bg-[#7150ff]`}>
            <div className="flex items-center justify-center gap-7 w-full h-full border-2 border-dashed rounded-4xl p-2 border-primary-color">
              <div className="flex items-center justify-center gap-7 w-full h-full overflow-scroll rounded-4xl border-2 border-white bg-white">
                {shuffling && (
                  <div className="mt-4 text-7xl font-bold animate-pulse text-[#7150ff]">
                    {currentName}
                  </div>
                )}

                {winner.length > 0 && (
                  <div className="mt-12 flex flex-col gap-10 items-center h-full w-full overflow-auto">
                    <h2 className="text-5xl font-bold text-center font-agrandir text-black">
                      🎉 <mark className="highlight">Congratulations</mark> 🎉
                    </h2>
                    <ul className="flex flex-col">
                      {winner.map((w, index) => (
                        <li
                          key={index}
                          className="list-decimal border-2 border-black px-2 text-black text-4xl font-medium"
                        >
                          {w}
                        </li>
                      ))}
                    </ul>
                    <p className="text-center text-3xl font-poppins font-bold bg-white px-4">
                      <span className="text-primary">Your Prize</span>: {winnerPrizeDetail.prize}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {winner.length > 0 && (
              <Confetti
                width={dimensions.width}
                height={dimensions.height}
                recycle={false}
                numberOfPieces={500}
              />
            )}
          </div>

          {/* SVG and pattern images remain the same */}
          <svg
            version="1.1"
            id="fi_60995"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100px"
            height="100px"
            viewBox="0 0 255 255"
            className="-mt-14"
          >
            <g fill="#7150ff">
              <g id="arrow-drop-down">
                <polygon points="0,63.75 127.5,191.25 255,63.75"></polygon>
              </g>
            </g>
          </svg>

          <img src={patterns1} className="absolute w-lg -right-52 -top-60" alt="" />
          <img src={patterns2} className="absolute w-[300px] -left-20 -top-28" alt="" />
          <img src={patterns3} className="absolute w-lg bottom-0 -left-60" alt="" />
          <img src={patterns4} className="absolute w-[300px] -right-40 -bottom-0" alt="" />
        </div>

        <div className="col-span-3 h-full flex items-center z-50">
          <Siderbar
            participants={participants}
            setParticipants={setParticipants}
            winner={winner}
            shuffling={shuffling}
            setWinner={setWinner}
            setShuffling={setShuffling}
            currentName={currentName}
            setCurrentName={setCurrentName}
            pickWinner={pickWinner}
            setFileLoading={setFileLoading}
            setWinnerPrizeDetail={setWinnerPrizeDetail}
            winnerPrizeDetail={winnerPrizeDetail}
            prize={winnerPrizeDetail.prize}
            noOfWinner={winnerPrizeDetail.noOfWinner}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;