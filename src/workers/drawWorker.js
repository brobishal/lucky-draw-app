// Handles the random selection logic
self.onmessage = function(e) {
    if (e.data.type !== 'draw') return;
    
    const { participants, noOfWinner, previousWinners, prize } = e.data;
    
    // Send progress updates during processing
    const sendProgress = (current, total) => {
      self.postMessage({
        type: 'progress',
        progress: Math.floor((current / total) * 100)
      });
    };
    
    // Filter out previous winners
    const eligibleParticipants = participants.filter(
      item => !previousWinners.includes(item)
    );
    
    if (eligibleParticipants.length === 0) {
      self.postMessage({ 
        type: 'winners',
        winners: ["No eligible participants left"] 
      });
      return;
    }
    
    // Optimized shuffle for large arrays
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        
        // Send progress update every 1000 items
        if (i % 1000 === 0) {
          sendProgress(newArray.length - i, newArray.length);
        }
      }
      return newArray;
    };
    
    const shuffled = shuffleArray(eligibleParticipants);
    const winners = shuffled.slice(0, noOfWinner);
    
    self.postMessage({ 
      type: 'winners',
      winners 
    });
  };