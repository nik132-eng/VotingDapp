import { useState, useEffect } from "react";
function CandidateDisplay({ state }) {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const { contract } = state;
    console.log(state);
    async function candidatesDisplay() {
      const candidates = await contract.methods.candidateList().call();
      console.log(candidates);
      setCandidates(candidates);
    }
    contract && candidatesDisplay();
  }, [state]);
  return (
    // <></>
    <table>
      <tbody>
        {candidates.map((candidate) => {
          return (
            <tr key={candidate.candidateId}>
              <td>{candidate.name}</td>
              <td>{candidate.party}</td>
              {/* <td>{candidate.age}</td>
              <td>{candidate.gender}</td> */}
              <td>{candidate.candidateId}</td>
              {/* <td>{candidate.candidateAddress}</td> */}
              <td>{candidate.votes}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default CandidateDisplay;