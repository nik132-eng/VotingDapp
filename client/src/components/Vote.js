import { useState, useEffect } from "react";

function Vote({state,account}) {
  const [status, setStatus] = useState("Not declared");

  async function voting(event) {
    event.preventDefault();
    const { contract } = state;
    const voterIdInput = document.querySelector("#voterId");
    const candidateIdInput = document.querySelector("#candidateId");

    // Check if input elements exist before accessing their value
    if (voterIdInput && candidateIdInput) {
      try {
        const voterId = voterIdInput.value;
        const candidateId = candidateIdInput.value;
        await contract.methods.vote(voterId, candidateId).send({ from: account, gas: "2000000" });
        alert("Your vote has been received");   
      } catch(err) {
        alert("Error: " + err);
      }
    } else {
      alert("Could not find input elements for voterId and candidateId.");
    }
  }

  useEffect(()=>{
    const {contract} = state;
    async function getStatus(){
      const status = await contract.methods.votingStatus().call();
      setStatus(status);
    }
    if (contract) {
      getStatus();
    }
  }, [state]);

  return (
    <div>
      <form className="form" onSubmit={voting}>
        <p className="status">Voting Status:{status}</p>
        <label className="label2" htmlFor="voterId">
          VoterId:
        </label>
        <input className="innerBoxVote" type="text" id="voterId" />

        <label className="label2" htmlFor="candidateId">
          Candidate Id:
        </label>
        <input className="innerBoxVote" type="text" id="candidateId" />
        <button className="regBtn" type="submit">
          Vote
        </button>
      </form>
    </div>
  );
}

export default Vote;
