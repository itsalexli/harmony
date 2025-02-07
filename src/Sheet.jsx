import React, { useEffect, useRef } from "react";
import abcjs from "abcjs";

export default function Sheet({ measureList }) {
  const notationRef = useRef(null);

  useEffect(() => {
    if (notationRef.current && measureList.length > 0) {
      const abcNotation = generateABCNotation(measureList);
      abcjs.renderAbc(notationRef.current, abcNotation, {
        scale: 1.6,
        add_classes: true,
        clickListener: function () {},
        selectionColor: "#111199",
      });
    }
  }, [measureList]);

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

  const generateABCNotation = (measures) => {
    let abcString = "X: 1\nT: Dynamic Music\nM: 4/4\nL: 1/4\nK: Cmaj\n";

    measures.forEach((measure) => {
      let measureString = "";
      measure.noteList.forEach((note) => {
        if (note.rest) {
          measureString += "z ";
        } else {
          measureString += `${note.step}${octaveToABC[note.octave]}${
            typetoLength[note.type]
          } `;
        }
      });
      abcString += measureString.trim() + " | ";
    });
    console.log(measureList);
    console.log(abcString);
    return abcString;
  };

  return <div ref={notationRef} className="w-4/5 bg-blue-50" />;
}
