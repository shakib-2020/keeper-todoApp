import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

// get notes form localStorage

function getLocalNotes() {
  let list = localStorage.getItem("notesList");
  if (list) {
    return JSON.parse(localStorage.getItem("notesList"));
  } else {
    return [];
  }
}

function App() {
  const [notes, setNotes] = useState(getLocalNotes());

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  // add notes to localStorage
  useEffect(() => {
    localStorage.setItem("notesList", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
