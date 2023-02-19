import { Route, Link } from "react-router-dom";
import CandidateRegister from "./components/CandidateRegister";
import VoterRegister from "./components/VoterRegister";
import Winner from "./components/Winner";
import Vote from "./contracts/Vote.json";
import Web3 from "web3";
import { useEffect, useState } from "react";
import "./App.css";
import ElectionCommision from "./components/ElectionCommision";
import { Autocomplete, styled, Tab, TextField } from "@mui/material";
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import TabPanelUnstyled, { tabPanelUnstyledClasses } from '@mui/base/TabPanelUnstyled';
import { tabsListUnstyledClasses, TabsUnstyled } from "@mui/base";
import TabsListUnstyled from '@mui/base/TabsListUnstyled';

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    async function init() {
      const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
      const web3 = new Web3(provider);
      //console.log(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Vote.networks[networkId];
      //console.log("Contract Address:", deployedNetwork.address);
      const contract = new web3.eth.Contract(Vote.abi, deployedNetwork.address);
      //console.log(contract);
      setState({ web3: web3, contract: contract });
    }
    init();
  }, []);
  useEffect(() => {
    const { web3 } = state;
    const allAccounts = async () => {
      var select = document.getElementById("selectNumber");
      var options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    };
    web3 && allAccounts();
  }, [state]);
  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;

    if (
      selectedAccountAddress &&
      selectedAccountAddress !== "Choose an account"
    ) {
      setAccount(selectedAccountAddress);
    }
  };

  
const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const TabPanel = styled(tabPanelUnstyledClasses)`
width: 100%;
font-family: IBM Plex Sans, sans-serif;
font-size: 0.875rem;
`;

const TabsList = styled(tabsListUnstyledClasses)(
({ theme }) => `
min-width: 400px;
background-color: ${blue[500]};
border-radius: 12px;
margin-bottom: 16px;
display: flex;
align-items: center;
justify-content: center;
align-content: space-between;
box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
`,
);


  return (
    <>
      <div className="topnav">
        <a>
          <Link to="/">Home</Link>
        </a>
        <a>
          <Link to="/candidate">Candidate</Link>
        </a>
        <a>
          <Link to="/voter">Voter</Link>
        </a>
        <a>
          <Link to="/electioncommision">Election Commision</Link>
        </a>
      </div>


      <div className="maiNcontainer">
        <Link className="ca" underline="hover">
          Connected Account:  {account}
        </Link>
        <form className="label0" id="myForm">
          <label htmlFor="">Choose an Account</label>
          <select
            className="innerBox"
            id="selectNumber"
            onChange={selectAccount}
          >
            <option></option>
          </select>
        </form>

        <Route path="/candidate">
          <CandidateRegister
            state={state}
            account={account}
          ></CandidateRegister>
        </Route>
        <Route path="/voter">
          <VoterRegister state={state} account={account}></VoterRegister>
        </Route>
        <Route path="/electioncommision">
          <ElectionCommision
            state={state}
            account={account}
          ></ElectionCommision>
        </Route>
        {/* <Winner state={state}></Winner> */}
      </div>
    </>
  );
}

export default App;
