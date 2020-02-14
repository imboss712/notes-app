const yargs = require("yargs");
const notes = require("./notes");

//Customizing yargs version
yargs.version("1.1.0");

//Create a new note
//Run in Terminal ---> node index.js add --title="Buy Soap" --body="Dettol Bathing Soap MRP-27"
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => notes.addNote(argv.title, argv.body)
});

//Remove a note
//Run in Terminal ---> node index.js remove --title="Buy Soap"
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => notes.removeNote(argv.title)
});

//Read a note
//Run in Terminal ---> node index.js read --title="Buy Soap"
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => notes.readNote(argv.title)
});

//List all notes
//Run in Terminal ---> node index.js list
yargs.command({
  command: "list",
  describe: "List all notes",
  handler: () => notes.listNotes()
});

// console.log(yargs.argv);
yargs.parse();
