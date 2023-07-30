import React, { useRef } from "react";

import { Slider, Typography, Grid, Box } from "@mui/material";

const PatientSlider = ({ min, max, value, onChange }) => {
  const sliderRef = useRef(null);
  const [dragging, setDragging] = React.useState(false);

  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  const handleSliderMouseDown = () => {
    setDragging(true);
  };

  const handleSliderMouseUp = () => {
    setDragging(false);
  };

  const handleSliderMouseMove = (event) => {
    if (dragging) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const offsetX = event.nativeEvent.offsetX;
      const newValue = value.slice();

      if (offsetX < sliderWidth / 2) {
        // Adjust the minimum age
        newValue[0] = Math.round((offsetX / (sliderWidth / 2)) * (max - min));
      } else {
        // Adjust the maximum age
        newValue[1] =
          Math.round(
            ((offsetX - sliderWidth / 2) / (sliderWidth / 2)) * (max - min)
          ) +
          (max - min) / 2;
      }

      onChange(newValue);
    }
  };

  return (
    <Box style={{ width: "500px", margin: "20px auto" }}>
      <Grid container alignItems="center" spacing={3}>
        <Grid item>
          <Typography>Filter by age:</Typography>
        </Grid>
        <Grid item xs>
          <Slider
            ref={sliderRef}
            value={value}
            onChange={handleSliderChange}
            onMouseDown={handleSliderMouseDown}
            onMouseUp={handleSliderMouseUp}
            onMouseMove={handleSliderMouseMove}
            valueLabelDisplay="auto"
            min={min}
            max={max}
            marks
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientSlider;
