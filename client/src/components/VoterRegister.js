import VoterList from "./VoterList";
import Vote from "./Vote";
import { Button, Stack, TextField } from "@mui/material";
import swal from 'sweetalert';

function VoterRegister({ state, account }) {
  async function register_voter(event) {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;
    console.log(name, age, gender);
    try {
      await contract.methods.voteRegister(name, age, gender).send({
        from: account,
        gas: "1000000",
      });
      swal(name +', You can vote now', "Voter Registration Is Successful", 'success')
      console.log(state);
      window.location.reload();
    } catch (error) {
      swal('Error', error.message || "", 'error')
    }
  }
  return (
    <>
      <form className="form" onSubmit={register_voter}>
        <Stack spacing={2} ml={-6} sx={{ maxWidth: 600 }}>
          <TextField id="name" label="Name" variant="outlined" />
          <TextField id="age" label="Age" variant="outlined" />
          <TextField id="gender" label="Gender" variant="outlined" />
          <Button variant="contained" type="submit">
            Voter Register
          </Button>
        </Stack>
      </form>

      <Vote state={state} account={account}></Vote>
      <VoterList state={state}></VoterList>
    </>
  );
}
export default VoterRegister;
