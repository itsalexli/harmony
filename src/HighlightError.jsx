export default function HighlightError({ measureList }) {
  measureList.forEach((measure) => {
    measure.noteList.forEach((note) => {
      if (note.step === "C") {
        console.log("Found a C note!");
      }
    });
  });
  console.log(measureList);
}
