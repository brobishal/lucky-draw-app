export const Button = ({onClick, shuffling, winner}) => {
  return (
    // <button onClick={onClick}  disabled={shuffling || winner !== null}
    <button onClick={onClick}  

    className={`text-black px-7 py-2 rounded-[16px] text-lg font font-poppins font-bold ${
      winner.length > 0  
        ? "bg-gray-400"
        : "bg-[#c1f11d] cursor-pointer "
    }`}
    disabled={winner.length > 0}

    // className={`bg-[#c1f11d] text-black px-7 py-2 rounded-[16px] text-lg font font-poppins font-bold cursor-pointer`}
    >
      Pick a Winner
    </button>
  );
};
