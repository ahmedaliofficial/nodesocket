import express from "express";

const app = express();
const port = 3000;
app.use("/", (req, res) => {
  res.json({ message: "Hello From Express App" });
});

app.listen(3000, () => {
  console.log(`Starting Server on Port ${port}`);
});
