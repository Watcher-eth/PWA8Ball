// @ts-nocheck

import React from "react";

const ProportionalSlider = ({ value }) => {
  const firstSegmentWidth = value * 100;
  const secondSegmentWidth = (1 - value) * 100;

  return (
    <div style={proportionalStyles.sliderContainer}>
      <div
        style={{
          ...proportionalStyles.segment,
          width: `${firstSegmentWidth}%`,
          backgroundColor: "#FFF",
        }}
      />
      <div
        style={{
          ...proportionalStyles.segment,
          width: `${secondSegmentWidth}%`,
          backgroundColor: "rgba(100, 100, 100, 0.4)",
        }}
      />
    </div>
  );
};

const proportionalStyles = {
  sliderContainer: {
    display: "flex",
    height: "11px", // Adjust the height as needed
    borderRadius: "10px", // Adjust for rounded corners
    overflow: "hidden",
    marginTop: "11.5px",
    marginBottom: "-3px",
    width: "100%", // Slider takes full width of its parent
  },
  segment: {
    height: "100%",
  },
};

export default ProportionalSlider;
