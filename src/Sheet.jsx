import React, { useEffect, useRef } from "react";
import abcjs from "abcjs";

let currentABCString = "";

export default function Sheet({ measureList }) {
  const notationRef = useRef(null);

  const octaveToABC = {
    1: ",,,",
    2: ",,",
    3: ",",
    4: "",
    5: "'",
    6: "''",
    7: "'''",
  };

  const typetoLength = {
    whole: 4,
    half: 2,
    quarter: 1,
    eighth: "/",
    "16th": "//",
  };

  const generateStaffNotation = (staffNotes) => {
    return staffNotes
      .map((note) =>
        note.rest
          ? "z"
          : `${note.step}${octaveToABC[note.octave] || ""}${
              typetoLength[note.type] || ""
            }`
      )
      .join(" ");
  };

  const generateABCNotation = (measures) => {
    if (!measures || measures.length === 0) {
      console.error("No measures provided.");
      return "";
    }

    const staffMeasure1 = [];
    const staffMeasure2 = [];

    measures.forEach((measure) => {
      const staff1Notes = measure.noteList.filter((note) => note.staff == 1);
      const staff2Notes = measure.noteList.filter((note) => note.staff == 2);
      staffMeasure1.push(staff1Notes);
      staffMeasure2.push(staff2Notes);
    });

    const Staff1Voice1 = [];
    const Staff1Voice2 = [];

    console.log("Staff Measure 1:\n", staffMeasure1);

    staffMeasure1.forEach((measure) => {
      const voice1Notes = measure.filter((note) => note.voice == 1);
      const voice2Notes = measure.filter((note) => note.voice == 2);
      Staff1Voice1.push(voice1Notes);
      Staff1Voice2.push(voice2Notes);
    });

    const Staff2Voice1 = [];
    const Staff2Voice2 = [];

    staffMeasure2.forEach((measure) => {
      const voice1Notes = measure.filter((note) => note.voice == 5);
      const voice2Notes = measure.filter((note) => note.voice == 6);
      Staff2Voice1.push(voice1Notes);
      Staff2Voice2.push(voice2Notes);
    });

    console.log("Staff 1 Voice 1 Notes:\n", Staff1Voice1);
    console.log("Staff 1 Voice 2 Notes:\n", Staff1Voice2);

    let abcString =
      "X: 1\nT: Dynamic Music\nM: 4/4\nL: 1/4\nK: Cmaj\n%%score (T1 T2) (B1 B2)\nV:T1 clef=treble\nV:T2 clef=treble\nV:B1 clef=bass\nV:B2 clef=bass\n";

    // Staff 1 Voice 1 Notes
    abcString += "[V:T1] ";
    abcString +=
      Staff1Voice1.map((measure) => generateStaffNotation(measure)).join(
        " | "
      ) + " |\n";

    // Staff 1 Voice 5 Notes
    abcString += "[V:T2] ";
    abcString +=
      Staff1Voice2.map((measure) => generateStaffNotation(measure)).join(
        " | "
      ) + " |\n";

    //Staff 2 Voice 1 Notes
    abcString += "[V:B1] ";
    abcString +=
      Staff2Voice1.map((measure) => generateStaffNotation(measure)).join(
        " | "
      ) + " |\n";

    //Staff 2 Voice 5 Notes
    abcString += "[V:B2] ";
    abcString +=
      Staff2Voice2.map((measure) => generateStaffNotation(measure)).join(
        " | "
      ) + " |\n";

    console.log("Generated ABC Notation:\n", abcString);
    console.log(abcString);
    currentABCString = abcString;
    return abcString;
  };

  function findMeasure(startChar) {
    const target = "]";
    let currentPointer = startChar;
    let measureCount = 0;
    while (currentABCString[currentPointer] != target) {
      if (currentABCString[currentPointer] == "|") {
        measureCount++;
      }
      currentPointer--;
    }

    return measureCount + 1;
  }

  function handleNoteClick(analysis) {
    console.log("Clicked Note Info:", {
      analysis: analysis,
    });

    // console.log("StartChar" + analysis.startChar);
    // console.log("EndChar" + analysis.endChar);

    console.log(
      "Current step: " +
        currentABCString.substring(analysis.startChar, analysis.endChar)
    );
    console.log("Measure: " + findMeasure(analysis.startChar));
  }

  useEffect(() => {
    if (notationRef.current && measureList.length > 0) {
      notationRef.current.innerHTML = ""; // Clear previous notation
      const abcNotation = generateABCNotation(measureList);
      abcjs.renderAbc(notationRef.current, abcNotation, {
        scale: 1.6,
        add_classes: true,
        clickListener: handleNoteClick,
        selectionColor: "#111199",
      });
    }
  }, [measureList]);

  return <div ref={notationRef} className="w-4/5 bg-blue-50" />;
}
