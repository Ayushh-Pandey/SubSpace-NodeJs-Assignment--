import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// data-retrieval middleware
import dataRoute from "./routes/data-retrieval-route.js";
app.use('/api', dataRoute);

app.get('/', (req, res) => {
  res.status(200).json("server is running perfectly")
});

// error handling middleware
import { errorHandler } from "./middlewares/errorMiddleware.js";
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is live on http://localhost:${PORT}`);
})
