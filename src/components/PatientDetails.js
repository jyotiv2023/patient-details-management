import React from "react";
import { Modal, Box, Typography, styled } from "@mui/material";

// Style the heading
const Heading = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

// Style the patient details text
const PatientDetailsText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  marginBottom: theme.spacing(2),
  padding: "2px",
  marginRight: "5px",
  //color: theme.palette.primary.main,
  // textAlign: "center",
}));

const PatientDetails = (props) => {
  if (!props.selectedPatient) return null;

  return (
    <Modal open={props.openModal} onClose={props.handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Heading variant="h6">Patient Details</Heading>
        <PatientDetailsText>
          Name: {props.selectedPatient.name}
        </PatientDetailsText>
        <PatientDetailsText>
          Gender: {props.selectedPatient.gender}
        </PatientDetailsText>
        <PatientDetailsText>
          Age: {props.selectedPatient.age}
        </PatientDetailsText>
        <PatientDetailsText>
          Address: {props.selectedPatient.address}
        </PatientDetailsText>
        <PatientDetailsText>
          Phone: {props.selectedPatient.phone}
        </PatientDetailsText>
      </Box>
    </Modal>
  );
};

export default PatientDetails;
