import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
        <Stack mt={2}></Stack>
          <TableContainer component={Paper} mt={4}>
            <Table sx={{ minWidth: 450  }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Candidate Name</StyledTableCell>
                  <StyledTableCell align="center">Party Name</StyledTableCell>
                  <StyledTableCell align="center">&nbsp;Sr. No.</StyledTableCell>
                  <StyledTableCell align="center">&nbsp;Votes</StyledTableCell>
                  <StyledTableCell align="center">&nbsp;Address</StyledTableCell>
                </TableRow>
              </TableHead>
      {candidates.map((candidate) => {
        return (
              <TableBody>
                <StyledTableRow key={candidate.candidateId}>
                  <StyledTableCell align="center">
                    {candidate.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {candidate.party}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {candidate.candidateId}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {candidate.votes}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {candidate.candidateAddress}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
                );
              })}
            </Table>
          </TableContainer>
    </>
  );
}
export default CandidateDisplay;
