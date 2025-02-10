import React, { useEffect, useRef } from "react";
import abcjs from "abcjs";

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

    let abcString =
      "X: 1\nT: Dynamic Music\nM: 4/4\nL: 1/4\nK: Cmaj\n%%staves\n{V1 V2}\nV: V1 clef=treble\nV: V2 clef=bass\n";

    // Staff 1 Notes
    abcString += "[V: V1] ";
    abcString +=
      staffMeasure1
        .map((measure) => generateStaffNotation(measure))
        .join(" | ") + " |\n";

    // Staff 2 Notes
    abcString += "[V: V2] ";
    abcString +=
      staffMeasure2
        .map((measure) => generateStaffNotation(measure))
        .join(" | ") + " |\n";

    console.log("Generated ABC Notation:\n", abcString);

    return abcString;
  };

  useEffect(() => {
    if (notationRef.current && measureList.length > 0) {
      notationRef.current.innerHTML = ""; // Clear previous notation
      const abcNotation = generateABCNotation(measureList);
      abcjs.renderAbc(notationRef.current, abcNotation, {
        scale: 1.6,
        add_classes: true,
        clickListener: function () {},
        selectionColor: "#111199",
      });
    }
  }, [measureList]);

  return <div ref={notationRef} className="w-4/5 bg-blue-50" />;
}
