const express = require('express');
const app = express();

app.get("/", async(rec, res) => {
  res.send("Licitação")
});

app.listen(3302,()=> {
  console.log("Servidor iniciado na porta 3306: https://localhost:3306");
});

app.use(express.json());


