import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Modal,
  Box,
  useTheme,
} from "@mui/material";

import PatientDetails from "./PatientDetails";
import TableHeader from "./TableHeader";

const PatientTable = ({ patients }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  // Sort the patient list based on the sortKey and sortOrder
  const sortedPatients = [...patients].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
      return a[sortKey] < b[sortKey] ? 1 : -1;
    }
  });

  const formatDate = (birthdate) => {
    if (!birthdate) {
      return "--"; // or return any default value you prefer for missing birthdate
    }
    const date = new Date(birthdate);
    if (isNaN(date.getTime())) {
      return "--"; // or return any default value for invalid birthdate
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const theme = useTheme();

  const tableCellStyle = {
    textAlign: "left",
  };

  const tableContainerStyle = {
    maxHeight: "400px", // Adjust the height as needed
    overflow: "auto",
  };

  return (
    <Box>
      <TableContainer component={Paper} style={tableContainerStyle}>
        <Table>
          <TableHeader
            onSort={handleSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />
          <TableBody>
            {sortedPatients.map((patient) => (
              <TableRow
                key={patient.id}
                onClick={() => handleRowClick(patient)}
              >
                <TableCell sx={tableCellStyle}>{patient.id}</TableCell>
                <TableCell sx={tableCellStyle}>{patient.name}</TableCell>
                <TableCell sx={tableCellStyle}>{patient.gender}</TableCell>
                <TableCell sx={tableCellStyle}>
                  {formatDate(patient.birthDate)}
                </TableCell>
                <TableCell sx={tableCellStyle}>{patient.address}</TableCell>
                <TableCell sx={tableCellStyle}>{patient.phone}</TableCell>
                <TableCell sx={tableCellStyle}>
                  <Button variant="outlined">Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PatientDetails
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        selectedPatient={selectedPatient}
      />
    </Box>
  );
};

export default PatientTable;
