import Winner from "./Winner";

function ElectionCommision({state, account}) {
  async function start_end(event){
    // event.preventDefault();
    const {contract} = state;
    const start_time = document.querySelector('#start').value;
    const end_time = document.querySelector('#end').value;
    console.log(start_time, end_time);

    try{
      await contract.methods.voteTime(start_time, end_time).send({
        from: account,
        gas:"1000000"
      });

    }catch(err){
      alert("Error: " + err);
    }
  }

  async function emergency(){
    const {contract} = state;
    try{
      await contract.methods.emergency().send({
        from: account,
        gas:"1000000"
      });
      alert("emergency called")
    }catch(err){
      alert("Error: " + err);
    }
  }

  async function result(){
    const {contract} = state;
    try{
      await contract.methods.result().send({
        from: account,
        gas:"1000000"
      });
      alert("result called");
    }catch(err){
      alert("Error: " + err);
    }
  }

  return (
    <>
      <div>
        <form className="form" onSubmit={start_end}>
          <label className="label2" htmlFor="start">
            Start Time:
          </label>
          <input className="innerBoxVote" type="text" id="start"></input>

          <label className="label2" htmlFor="end">
            End Time:
          </label>
          <input className="innerBoxVote" type="text" id="end"></input>

          <button className="regBtn" type="submit">
            Voting Start
          </button>
        </form>
      </div>
      <div className="space">
        <button className="emerBtn" onClick={emergency}>
          Emergency
        </button>
        <button className="resBtn" onClick={result}>
          Result
        </button>
      </div>
      <Winner state={state} />
    </>
  );
}
export default ElectionCommision;
