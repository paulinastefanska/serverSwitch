const http = require("http");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3000;

const users = [
  { name: "Adam", id: 1 },
  { name: "Ewa", id: 2 }
];

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    switch (req.url) {
      case "/":
        fs.readFile(path.join(__dirname, "index.html"), (err, page) => {
          if (err) res.end("Can not download file");
          else res.end(page);
        });
        break;
      case "/users":
        fs.readFile(path.join(__dirname, "users.html"), (err, page) => {
          if (err) res.end("Can not download file");
          else res.end(page);
        });
        break;
      case "/api/users":
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8"
        });
        const usersJSON = JSON.stringify(users);
        res.end(usersJSON);
        break;
      case "/code.js":
        res.writeHead(200, {
          "Content-Type": "application/javascript; charset=utf-8"
        });
        fs.readFile(path.join(__dirname, "code.js"), (err, page) => {
          if (err) res.end("Can not download file");
          else res.end(page);
        });
        break;
      default:
        res.end("404 Error");
    }
  })
  .listen(port, "127.0.0.1", () => {
    console.log(port);
  });
