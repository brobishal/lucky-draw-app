self.onmessage = function (e) {
  console.log("Worker started"); // Check if the worker is being initialized

  const { participants, previousWinners, noOfWinner, prize } = e.data;

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  let winners = [];
  const eligibleParticipants = participants.filter(
    (item) => !previousWinners.includes(item)
  );

  if (eligibleParticipants.length === 0) {
    self.postMessage({ winners: ["No eligible participants left"] });
    return;
  }

  const shuffledParticipants = shuffleArray([...eligibleParticipants]);

  let shuffleInterval = setInterval(() => {
    const currentParticipant =
      shuffledParticipants[
        Math.floor(Math.random() * shuffledParticipants.length)
      ];
    self.postMessage({ action: "shuffling", currentName: currentParticipant });
  }, 100);

  setTimeout(() => {
    if (prize === "Bajaj Pulsar 150cc") {
      const winnerIndex = Math.floor(
        Math.random() * shuffledParticipants.length
      );
      winners = shuffledParticipants.splice(winnerIndex, noOfWinner);
    } else {
      winners = shuffledParticipants.splice(0, noOfWinner);
    }
    clearInterval(shuffleInterval);
    self.postMessage({ action: "winner", winners });
  }, 3000);
};
