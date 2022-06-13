const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:8080"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const db = require('./app/models/');
const { PROD_URI } = process.env;
db.mongoose
    .connect(process.env.PROD_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database Connected.!');
    }).catch((err) => {
        console.log('Cannot Connect to Database.!', err);
        process.exit();
    })

app.get("/", (req, res) => {
    res.json({
        message: "Welcome"
    })
});

require('./app/routes/app.routes')(app)

const PORT = 8000;
const { SERVER_PORT } = process.env;
app.listen(process.env.SERVER_PORT || PORT, () => {
    console.log(`Server is Running on`);
    if(SERVER_PORT){
        console.log(`http://localhost:${SERVER_PORT}`)
    } else {
        console.log(`http://localhost:${PORT}`)
    }
});