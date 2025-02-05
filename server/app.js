import express from 'express';
import cors from 'cors';
import auth from './routes/auth.routes.js';
import Note from './routes/note.routes.js'
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("Server is running")
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
  };

app.use(cors(corsOptions));



app.use('/api/auth',auth);
app.use('/api/note',Note);