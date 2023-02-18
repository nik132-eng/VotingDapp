import { useEffect, useState } from "react";

function Winner({ winner, state }) {
  const [winnerStatus, setWinnerStatus] = useState("Declared after some time");

  useEffect(() => {
    const { contract } = state;

    async function getWinner() {
      if (!contract) {
        return;
      }

      try {
        const result = await contract.methods.winner().call();
        setWinnerStatus(result);
      } catch (error) {
        console.log(error);
      }
    }

    getWinner();
  }, [state]);

  return <div className="win">Winner is: {winnerStatus || winner}</div>;
}

export default Winner;
