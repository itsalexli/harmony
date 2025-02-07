import React, { useState } from "react";
import Upload from "./Upload";
import Sheet from "./Sheet";

function App() {
  const [measureList, setMeasureList] = useState([]);

  return (
    <>
      <Upload setMeasureList={setMeasureList} />
      <Sheet measureList={measureList} />
    </>
  );
}

export default App;
