import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { maxWidth, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

function VoterList({ state }) {
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
      <TableContainer mt={4}>
        <Table sx={{ minWidth: 450 , maxWidth: 600}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">VoterId</StyledTableCell>
              <StyledTableCell align="center">Voter Name</StyledTableCell>
              <StyledTableCell align="center">&nbsp;CandidateId</StyledTableCell>
            </TableRow>
          </TableHead>
          {voters.map((voter) => {
            return (
              <TableBody>
                <StyledTableRow key={voter.voterId}>
                  <StyledTableCell align="center">
                  {voter.voterId}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  {voter.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  {voter.voteCandidateId}
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

export default VoterList;
