import React from "react";
import { DataGrid } from "../../api/data";
import "./index.scss";

const GridButton = ({ handleGrid }) => {
  return (
    <div className="map-selection-cont">
      <h2>Select a Grid to play</h2>
      <div className="gridbuttons-cont">
        {DataGrid.map((grid, index) => {
          return (
            <button onClick={() => handleGrid(grid.pairs)} key={index}>
              {grid.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GridButton;
