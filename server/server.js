import express from "express"
import morgan from "morgan";
import connectDB from "./config/db.js"
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/authRoutes.js";

//database config
connectDB();

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors({
    origin: 'http://localhost:3000', //frontend link
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// Add this middleware to set headers for preflight requests
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: "Hello this is Skin Cancer Detetction system Backend"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "internal server error",
            error
        })
    }
})

app.use("/api/auth", userRouter);


// Server Start
const PORT =  8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});