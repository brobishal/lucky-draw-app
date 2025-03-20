export const Button = ({onClick, shuffling, winner}) => {
  return (
    <button onClick={onClick}  disabled={shuffling || winner !== null}
    className={`text-black px-10 py-3 rounded-[16px] text-xl font font-poppins font-bold cursor-pointer ${
      winner !== null 
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#c1f11d] "
    }`}
    >
      Pick a Winner
    </button>
  );
};
