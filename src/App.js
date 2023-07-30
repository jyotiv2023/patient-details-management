import React, { useState } from "react";
import PatientTable from "./components/PatientsList";
import PatientSlider from "./components/Slider";
import useFetchPatientsByAge from "./components/hooks/usePatientData";
import { Box, Typography, styled, AppBar, Toolbar } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  padding: theme.spacing(3),
}));

const NavBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  background: "#ffffff",
  padding: "5px",
}));

const App = () => {
  const [ageRange, setAgeRange] = useState({ min: 0, max: 100 });
  const patients = useFetchPatientsByAge(ageRange.min, ageRange.max);

  const handleSliderChange = (newValue) => {
    setAgeRange({ min: newValue[0], max: newValue[1] });
  };

  return (
    <Box>
      <NavBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" style={{ color: "#444" }}>
            Patient List
          </Typography>
        </Toolbar>
      </NavBar>
      <Container>
        <PatientSlider
          min={0}
          max={100}
          value={[ageRange.min, ageRange.max]}
          onChange={handleSliderChange}
        />
        <PatientTable patients={patients} />
      </Container>
    </Box>
  );
};

export default App;
