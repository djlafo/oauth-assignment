import express from "express";
import api from './api/index.ts';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});