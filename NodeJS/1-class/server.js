// import express from "express";

// const app = express();

// app.use(express.json());

// app.get("/health", (req, res) => {
//   const { method, url, headers, body } = req;

//   console.log("Request Details:", { method, url, headers, body });

//   return res.status(200).send({
//     status: "OK",
//     timestamp: new Date().toISOString(),
//     body: {
//       message: `
//         Server is healthy and running.
//             AND
//         E'to e una prueba de la mejol clase de node'
//         `,
//     },
//   });
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
//   // send a email or notification here
//   // craate a file for cron services...
//   // whatever you want
// });

/*
    1. crear empty project
    2. usar node latest version / cualquier disponible
    3. crear un server con express
    4. crear un endpoint /health
      4.1 que retorne 200
      4.2 que retorne un json { status: 'OK', timestamp: '2023-10-10T10:10:10Z', body: { / * object con tus datos personales: nombre, apellido, ciudad, edad * / } }
    5. que corra en el puerto 3000
*/

// Student Code //
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/health", (req, res) => {
  return res.status(200).send({
    status: "OK",
    timestamp: "2023-10-10T10:10:10Z",
    body: {
      nombre: "Arlinton",
      apellido: "Feliz",
      ciudad: "Santo Domingo",
      edad: 22,
    },
  });
});

app.listen(port, () => {
  console.log(`Esta corriendo en http://localhost:${port}`);
  console.log(`Esta corriendo en http://localhost:${port}/health`);
});
