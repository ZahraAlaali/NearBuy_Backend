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

app.use(
  cors({
    origin: ["https://nearbuy.surge.sh", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
app.options("*", cors())

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
