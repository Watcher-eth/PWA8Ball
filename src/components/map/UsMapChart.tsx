import { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import { scaleLinear } from "d3-scale";

import { TEST_STATE_DATA } from "./testStateData";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


const COLOR_SCALE = {
  red: scaleLinear().domain([0, 2]).range(["#FFCCCB", "#FF0000"]),
  blue: scaleLinear().domain([0, 2]).range(["#CCE5FF", "#0000FF"]),
};
export function UsMapChart() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const stateData = TEST_STATE_DATA
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
      <div ref={containerRef} className=" relative overflow-visible">
        <ComposableMap projection="geoAlbersUsa" height={500} width={800}>
          <Geographies geography={GEO_URL}>
            {({ geographies, outline, borders }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name;
                const stateInfo = stateData[stateName];
                let fillColor; // Default color

                if (stateInfo) {
                  fillColor = COLOR_SCALE[stateInfo.party](stateInfo.value);
                } else {
                  fillColor = "#D6D6DA";
                }

                return (
                  <>
                    <Geography
                      key={geo.rsmKey}
                      className=" transition-all  z-10"
                      geography={geo}
                      fill={fillColor}
                      onMouseEnter={() => {
                        // setContent(
                        //   `${stateName}: ${stateInfo ? stateInfo.party : "N/A"}`
                        // );
                      }}
                      onMouseLeave={() => {
                        // setContent("");
                      }}
                      style={{
                        default: {
                          outline: "none",
                          //   strokeWidth: "3px",
                        },
                        //   hover: {
                        //     fill: "#F53",
                        //     outline: "none",
                        //   },
                        pressed: {
                          fill: "#E42",
                          outline: "none",
                        },
                      }}
                      data-tooltip-id="state-tooltip"
                      data-tooltip-content={`${stateName}: ${
                        stateInfo ? stateInfo.party : "N/A"
                      }`}
                    />
                    <Geography
                      geography={outline}
                      fill="none"
                      stroke="#ffffff05"
                    />
                    <Geography
                      geography={borders}
                      fill="none"
                      stroke="#ffffff10"
                    />
                  </>
                );
              })
            }
          </Geographies>
        </ComposableMap>
        {/* <Tooltip id="state-tooltip" /> */}
    </div>
  );
};

