const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const AuthRouter = require("./routes/AuthRouter")
const ItemRouter = require("./routes/ItemRouter")
const StoreRouter = require("./routes/StoreRouter")
const OrderRouter = require("./routes/OrderRouter")
const UserRouter = require("./routes/UserRouter")

const PORT = process.env.PORT || 3000

const db = require("./db")

const app = express()

const allowedOrigins = ["https://nearbuy.surge.sh", "http://localhost:5173"]
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    return cb(new Error("Not allowed by CORS"))
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(cors(corsOptions))

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static("uploads"))

app.use("/auth", AuthRouter)
app.use("/item", ItemRouter)
app.use("/store", StoreRouter)
app.use("/order", OrderRouter)
app.use("/user", UserRouter)

app.use("/", (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
