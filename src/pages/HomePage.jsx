import { useState, useRef, useEffect } from "react";
import heighlight from "../assets/image/heighlight.svg";
import { Siderbar } from "../layouts/Siderbar";
import logo from "../assets/logo/logo.svg";
import { Button } from "../component/button/Button";
import Confetti from "react-confetti";
// import { useWindowSize } from 'react-use';

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
  const [fileData, setFileData] = useState(false);
  const [winnerPrizeDetail, setWinnerPrizeDetail] = useState(
    defaultWinnerPriceDetail
  );
  const [previousWinners, setPreviousWinners] = useState([]);

  const ref = useRef(null);
  console.log(previousWinners);
  const { prize, noOfWinner } = winnerPrizeDetail;
  // Function to shuffle the array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const pickWinner = () => {
    if (participants.length < 10 || shuffling) return;

    setShuffling(true);
    let counter = 0;
    const intervalTime = 1;

    const shuffleInterval = setInterval(() => {
      if (participants.length === 0) {
        clearInterval(shuffleInterval);
        setShuffling(false);
        return;
      }

      const randomIndex = Math.floor(Math.random() * participants.length);
      setCurrentName(participants[randomIndex]);

      counter++;
      if (counter >= 100) {
        clearInterval(shuffleInterval);
        setTimeout(() => {
          const eligibleParticipants = participants.filter(
            (item) => !previousWinners.includes(item)
          );

          if (eligibleParticipants.length === 0) {
            setWinner(["No eligible participants left"]);
            setShuffling(false);
            return;
          }

          const shuffledParticipants = shuffleArray([...eligibleParticipants]);
          console.log(shuffledParticipants);

          let selectedWinners = [];

          if (prize === "Bajaj Pulsar 150cc") {
            const winnerIndex = Math.floor(
              Math.random() * shuffledParticipants.length
            );
            selectedWinners = shuffledParticipants.splice(
              winnerIndex,
              noOfWinner
            ); // Removes the winner
          } else if (prize === "Galaxy A55 5G (8/256GB)") {
            selectedWinners = shuffledParticipants.splice(0, noOfWinner);
          } else if (prize === "Mi 32 HD Smart LED TV") {
            selectedWinners = shuffledParticipants.splice(0, noOfWinner);
          } else if (prize === "Ultima Nova Pro Smart watch") {
            selectedWinners = shuffledParticipants.splice(0, noOfWinner);
          } else if (prize === "Ultima Boost 20K Pro 20000mAh Powerbank") {
            selectedWinners = shuffledParticipants.splice(0, noOfWinner);
          } else if (prize === "Ultima Atom 192 Bluetooth Earbuds") {
            selectedWinners = shuffledParticipants.splice(0, noOfWinner);
          }

          // Update state using function-based approach to ensure previous winners are included
          setPreviousWinners((prev) => [...prev, ...selectedWinners]);
          setWinner([...selectedWinners]); // ✅ Fix

          setShuffling(false);
        }, 0);
      }
    }, intervalTime);
  };

  return (
    <div className="bg-[#FFFEE9]">
      <div className="grid grid-cols-12 items-center content-center">
        <div className="col-span-9 h-screen bg-[#FFFEE9] flex flex-col gap-7 items-center justify-center">
          {winner.length === 0 && fileLoading && (
            <div className="">
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
              <span className="loading loading-ball loading-xl"></span>
            </div>
          )}
          <h1 className="text-2xl font-bold font-agrandir">
            🏆 Lucky Draw <mark className="highlight">Winner Announcement</mark>{" "}
            🎉
          </h1>
          <p className="w-[70%] font-light text-xs text-col text-center font-poppins">
            🚗 The moment you've been waiting for is here! We are thrilled to
            announce the lucky winner of our InDrive Lucky Draw! 🎟️✨
          </p>
          <img src={logo} className="w-36" alt="Logo Image" />

          <div
            className={`${
              winner.length > 0
                ? ""
                : "flex items-center justify-center gap-7 border-2"
            } w-[80%] h-[400px] overflow-auto`}
          >
            <div>
              {participants.map((data, index) => {
                return <p key={index}></p>;
              })}
            </div>
            {/* shuffling &&  */}
            {shuffling && (
              <div className="mt-4 text-7xl font-bold animate-pulse text-red-500">
                {currentName}
              </div>
            )}

            {winner.length > 0 && (
              <div className="mt-12 flex flex-col gap-10 items-center">
                <h2 className="text-5xl text-primary font-bold text-center font-agrandir">
                  🎉 <mark className="highlight">Congratulations</mark> 🎉
                </h2>
                <ul className="grid grid-cols-4 items-center justify-center gap-10">
                  {winner.map((w, index) => (
                    <li
                      key={index}
                      className="list-decimal border-2 border-black px-2 text-black text-2xl font-medium"
                    >
                      {w}
                    </li>
                  ))}
                </ul>

                <p className="text-center text-4xl font-poppins font-bold bg-white px-4 border-2 border-black">
                  <span className="text-primary">Your Prize</span>: {prize}
                </p>
              </div>
            )}
          </div>
          {/* <Button onClick={pickWinner} shuffling={shuffling} winner={winner} /> */}
          {winner.length > 0 && <Confetti className="w-[70%] h-full" />}
        </div>

        <div className="col-span-3 h-full flex items-center">
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
            prize={prize}
            noOfWinner={noOfWinner}
            ref={ref}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
