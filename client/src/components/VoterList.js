import { useEffect, useState } from "react";

function VoterList({state}) {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    if (!state || !state.contract) {
      return;
    }
    async function voterList() {
      const voters = await state.contract.methods.voterList().call();
      setVoters(voters);
    }
    voterList();
  }, [state]);

  return (
    <table>
      <tbody>
        {voters.map((voter) => (
          <tr key={voter.voterId}>
            <td>{voter.voterId}</td>
            <td>{voter.name}</td>
            <td>{voter.voteCandidateId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VoterList;
