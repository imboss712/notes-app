const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(
      chalk.bgGreen.white("\n New note added! "),
      chalk.blue.inverse("\n Title : " + title + " \n")
    );
    console.log(chalk.yellow.inverse(` ${notes.length} Notes Total \n`));
  } else {
    console.log(chalk.white.bgRed("\n Note title already taken! \n"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(
      chalk.bgGreen.white("\n Note removed! "),
      chalk.blue.inverse("\n Title : " + title + " \n")
    );
    console.log(
      chalk.yellow.inverse(` ${notesToKeep.length} Notes Remained \n`)
    );
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.white.bgRed("\n No note found! \n"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (!notes) {
    console.log(chalk.bgRed.white("\n No notes found !! \n"));
  } else {
    console.log(
      chalk.white.bgBlue("\n Your Notes "),
      chalk.white.bgGreen(` ${notes.length} \n`)
    );
    notes.forEach(note => {
      console.log(chalk.yellow.bgBlack(` ${note.title} `));
    });
    console.log("");
  }
};

const readNote = title => {
  const notes = loadNotes();
  const noteToRead = notes.find(note => note.title === title);
  if (!noteToRead) {
    console.log(chalk.white.bgRed("\n No Note Found ! \n"));
  } else {
    console.log(chalk.white.bgGreen("\n Note Found !! "));
    console.log(
      chalk.yellow.inverse("\n title : ") +
        chalk.white.inverse(` ${noteToRead.title} `) +
        chalk.yellow.inverse("\n body : ") +
        chalk.white.inverse(` ${noteToRead.body} \n`)
    );
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
