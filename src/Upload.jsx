import { useRef, useState } from "react";

export default function Upload({ setMeasureList }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const xmlString = e.target.result;
        console.log("Uploaded file content:", xmlString);

        try {
          const xmlDocument = new DOMParser().parseFromString(
            xmlString,
            "text/xml"
          );
          const measures = xmlDocument.querySelectorAll("measure");
          const parsedMeasures = [];

          for (let i = 0; i < measures.length; i++) {
            const measure = measures[i];
            const measureNumber = measure.getAttribute("number");
            const notes = measure.querySelectorAll("note");
            const noteObjList = [];

            for (let j = 0; j < notes.length; j++) {
              const note = notes[j];
              const pitch = note.getElementsByTagName("pitch")[0];
              const rest = note.getElementsByTagName("rest")[0];

              if (pitch) {
                const step = pitch.getElementsByTagName("step")[0].textContent;
                const octave =
                  pitch.getElementsByTagName("octave")[0].textContent;
                const duration =
                  note.getElementsByTagName("duration")[0].textContent;
                const type = note.getElementsByTagName("type")[0].textContent;

                noteObjList.push({ step, octave, duration, type });
              } else if (rest) {
                const duration =
                  note.getElementsByTagName("duration")[0].textContent;
                noteObjList.push({ rest: true, duration });
              }
            }
            parsedMeasures.push({ measureNumber, noteList: noteObjList });
          }
          setMeasureList(parsedMeasures);
        } catch (error) {
          console.error("Error parsing XML:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".musicxml, .xml"
        onChange={handleFileUpload}
      />
      <button onClick={() => fileInputRef.current.click()}>Upload</button>
    </div>
  );
}
