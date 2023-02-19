import CandidateDisplay from "./CandidateDisplay";
import Button from "@mui/material/Button";
import { Stack, TextField } from "@mui/material";
import swal from "sweetalert";

function CandidateRegister({ state, account }) {
  async function register(event) {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const party = document.querySelector("#party").value;
    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;
    console.log(name, party, age, gender);
    try {
      await contract.methods.candidateRegister(name, party, age, gender).send({
        from: account,
        gas: "1000000",
      });
      swal(
        name + ", All the best for elections",
        "Candidate Registration Is Successful",
        "success"
      );
      console.log(state);
      window.location.reload();
    } catch (error) {
      swal('Error', error.message || "", 'error')
    }
  }
  return (
    <div>
      <form className="form" onSubmit={register}>
        <Stack spacing={2} ml={-6} sx={{ maxWidth: 600 }}>
          <TextField id="name" label="Name" variant="outlined" />
          <TextField id="party" label="Party" variant="outlined" />
          <TextField id="age" label="Age" variant="outlined" />
          <TextField id="gender" label="Gender" variant="outlined" />
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Stack>
      </form>
      <CandidateDisplay state={state}></CandidateDisplay>
    </div>
  );
}
export default CandidateRegister;
