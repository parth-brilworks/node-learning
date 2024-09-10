const fs = require("node:fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  console.log("Before appending:\n", data);

  const appendText = "\nHello, Node!";
  fs.appendFile("input.txt", appendText, () => {
    fs.readFile("input.txt", "utf8", (err, data) => {
      console.log("After appending:\n", data);
    });
  });
});
