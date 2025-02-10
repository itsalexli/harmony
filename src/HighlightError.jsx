export default function HighlightError({ measureList }) {
  const handleHighlight = () => {
    const highlightedNotes = document.querySelectorAll(".abcjs-note");
    let highlightNoteIndex = 0;
    for (let i = 0; i < measureList.length; i++) {
      for (let j = 0; j < measureList[i].noteList.length; j++) {
        if (measureList[i].noteList[j].step === "C") {
          let currNote = highlightedNotes[highlightNoteIndex];
          currNote.setAttribute("fill", "red");
        }
        highlightNoteIndex++;
      }
    }
  };

  return (
    <div>
      <button onClick={handleHighlight}>Highlight Errors</button>
    </div>
  );
}
