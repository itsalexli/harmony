import React, { useState } from "react";
import Upload from "./Upload";
import Sheet from "./Sheet";
import HighlightError from "./HighlightError";

function App() {
  const [measureList, setMeasureList] = useState([]);

  return (
    <>
      <Upload setMeasureList={setMeasureList} />
      <Sheet measureList={measureList} />
      <HighlightError measureList={measureList} />
    </>
  );
}

export default App;
