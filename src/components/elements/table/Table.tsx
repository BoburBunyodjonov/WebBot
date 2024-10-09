import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { StyledTableCell } from "./Table.style";

const TableComp = (props: any) => {
  const { headers, bodyChildren } = props;

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "100%", overflowY: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((header: any, index: any) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{bodyChildren}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
