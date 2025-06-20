import app from "./app";


let server;

const port = 4000;

const main = async () => {
  server = app.listen(port, () => {
    console.log(`Example app listening on port is on port: ${port}`);
  });
};

main();