import React, { useEffect } from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  Button,
  useTheme,
} from "@mui/material";

const TableHeader = ({ onSort, sortKey, sortOrder }) => {
  const theme = useTheme();

  const headerCellStyle = {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[800],
    fontWeight: "bold",
    textAlign: "left",
  };

  const headerButtonStyle = {
    color: theme.palette.grey[800],
    fontWeight: "bold",
  };

  // Function to recalculate the table header layout on mount and resize
  const recalculateTableHeaderLayout = () => {
    const tableHeaderCells = document.querySelectorAll(
      ".MuiTableHead-root .MuiTableCell-root"
    );
    tableHeaderCells.forEach((cell) => {
      cell.style.width = "auto";
      cell.style.width = `${cell.offsetWidth}px`;
    });
  };

  useEffect(() => {
    recalculateTableHeaderLayout();
    window.addEventListener("resize", recalculateTableHeaderLayout);
    return () => {
      window.removeEventListener("resize", recalculateTableHeaderLayout);
    };
  }, []);

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={headerCellStyle}>
          Id
          <Button onClick={() => onSort("id")} style={headerButtonStyle}>
            {sortKey === "id" && (sortOrder === "asc" ? "▲" : "▼")}
          </Button>
        </TableCell>
        <TableCell sx={headerCellStyle}>
          Name
          <Button onClick={() => onSort("name")} style={headerButtonStyle}>
            {sortKey === "name" && (sortOrder === "asc" ? "▲" : "▼")}
          </Button>
        </TableCell>
        <TableCell sx={headerCellStyle}>
          Gender
          <Button onClick={() => onSort("gender")} style={headerButtonStyle}>
            {sortKey === "gender" && (sortOrder === "asc" ? "▲" : "▼")}
          </Button>
        </TableCell>
        <TableCell sx={headerCellStyle}>
          BirthDate
          <Button onClick={() => onSort("birthDate")} style={headerButtonStyle}>
            {sortKey === "birthDate" && (sortOrder === "asc" ? "▲" : "▼")}
          </Button>
        </TableCell>
        <TableCell sx={headerCellStyle}>
          Address
          <Button onClick={() => onSort("address")} style={headerButtonStyle}>
            {sortKey === "address" && (sortOrder === "asc" ? "▲" : "▼")}
          </Button>
        </TableCell>
        <TableCell sx={headerCellStyle}>
          Phone
          <Button onClick={() => onSort("phone")} style={headerButtonStyle}>
            {sortKey === "phone" && (sortOrder === "asc" ? "▲" : "▼")}
          </Button>
        </TableCell>
        <TableCell sx={headerCellStyle}>Details</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
