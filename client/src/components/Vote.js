import { Button, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import Swal from "sweetalert2";
import swal from "sweetalert";

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
        Swal.fire({
          title: 'Your vote has been received',
          showCancelButton: false,
          showConfirmButton: false,
          width: 600,
          padding: '3em',
          color: '#000000',
          backdrop: `
            rgb(0,0,0,0.5)
            url("https://media.giphy.com/media/A28oYW2Q0v5i51i1CM/giphy.gif")
            left top
            no-repeat
          `
        }) 
      } catch(error) {
        swal('Error', error.message || "", 'error')
      }
    } else {
      swal('warning', "Could not find input elements for voterId and candidateId.", 'info')
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
      <Stack spacing={2} ml={-6} sx={{maxWidth:600}}>
      <p className="status">Voting Status: {status}</p>
          <TextField id="voterId" label="Voter Id:" variant="outlined" />
          <TextField id="candidateId" label="Candidate Id:" variant="outlined" />
          <Button startDecorator={<HowToVoteIcon />} sx={{"--Button-gap": "8px"}} color="success" variant="contained" type="submit">Vote</Button>
      </Stack>
      </form>
    </div>
  );
}

export default Vote;
