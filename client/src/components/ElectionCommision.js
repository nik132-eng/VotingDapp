import { Button, Grid, Paper, Stack, styled, TextField } from "@mui/material";
import swal from "sweetalert";
import Winner from "./Winner";
import Swal from 'sweetalert2'

function ElectionCommision({state, account}) {
  async function start_end(event){
    event.preventDefault();
    const {contract} = state;
    const start_time = document.querySelector('#start').value;
    const end_time = document.querySelector('#end').value;
    console.log(start_time, end_time);

    try{
      await contract.methods.voteTime(start_time, end_time).send({
        from: account,
        gas:"1000000"
      });
      swal('Voting started', "You can vote now", 'success')
    }catch(error){
      swal('Error', error.message || "", 'error')
    }
  }

  async function emergency(){
    const {contract} = state;
    try{
      await contract.methods.emergency().send({
        from: account,
        gas:"1000000",
      });
      Swal.fire({
        title: "Emergency called By commision",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
        width: 600,
        padding: '3em',
        color: '#000000',
        backdrop: `
          rgb(255,0,0,0.5)
        `
      })
    }catch(error){
      swal('Error', error.message || "", 'error')
    }
  }

  async function result(){
    const {contract} = state;
    try{
      await contract.methods.result().send({
        from: account,
        gas:"1000000"
      });

      Swal.fire({
        title: 'Result is declared By commision',
        showCancelButton: false,
        showConfirmButton: false,
        width: 600,
        padding: '3em',
        color: '#000000',
        backdrop: `
          rgb(0,0,0,0.5)
          url("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDMxYzEyNWZiYWI0N2U2YjNlOTIyYzQ0NzhlYzVlMjUyYjI3NmFiMSZjdD1z/NqZwRZjrRgEnpZFPR1/giphy.gif")
          left top
          no-repeat
        `
      })

      setTimeout(function() {
        window.location.reload();
    }, 3000);
    }catch(error){
      swal('Error', error.message || "", 'error')
    }
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <div>
      <form className="form" onSubmit={start_end}>
        <Stack spacing={2} ml={-6} sx={{maxWidth:600}}>
          <TextField id="start" label="Start Time:" variant="outlined" />
          <TextField id="end" label="End Time:" variant="outlined" />
          <Button variant="contained" type="submit" sx={{maxWidth:300}}>Voting start</Button>
      </Stack>
    </form>
      </div>
      <div className="space">
      <div className="box">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 6, sm: 1, md: 2 }}>
        <Grid item xs={6}>
          <Item>
            <Button color="success" variant="contained" onClick={emergency} >Emergency</Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Button color="success" variant="contained" onClick={result}>Result</Button>
          </Item>
        </Grid>
        </Grid>
      </div>

      </div>
      <Stack mt={3}></Stack>
      <Winner state={state} />
    </>
  );
}
export default ElectionCommision;
