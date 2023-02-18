import VoterList from "./VoterList";
import Vote from "./Vote";

function VoterRegister({state,account}) {
    async function register_voter(event){
      event.preventDefault();
      const {contract} = state;
      const name = document.querySelector("#name").value;
      const age = document.querySelector("#age").value;
      const gender = document.querySelector("#gender").value;
      console.log(name,age,gender);
      try{
        await contract.methods.voteRegister(name, age, gender).send({
          from: account,
          gas: "1000000",
        });
        alert("Voter Registration Is Successful");
        console.log(state);
        window.location.reload();
      }catch(error){
        alert(error);
      }
    }
  return (
    <div>
      <div className="btnContainer">
        <form className="form" onSubmit={register_voter}>
          <label className="label2" htmlFor="name">
            Name:
          </label>
          <input className="innerBoxVote" type="text" id="name"></input>

          <label className="label2" htmlFor="age">
            Age:
          </label>
          <input className="innerBoxVote" type="text" id="age"></input>

          <label className="label2" htmlFor="gender">
            Gender:
          </label>
          <input className="innerBoxVote" type="text" id="gender"></input>

          <button className="regBtn" type="submit">
            Register
          </button>
        </form>
        <Vote state={state} account={account}></Vote>
        <VoterList state={state}></VoterList>
      </div>
    </div>
  );
}
export default VoterRegister;
