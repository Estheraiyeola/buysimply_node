import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import productRoutes from './routes/product.routes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.use(cors({
  origin: ["https://buysimply-vue.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.method, req.path)
    next()
})

app.use('/api/products', productRoutes)

app.use(errorHandler)

const startServer = async () => {
    if (process.env.MONGO_URI) {
        await connectDB()
    } else {
        console.log('MONGO_URI not set — skipping DB connection')
    }

    const PORT = process.env.PORT || 5001
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

startServer().catch(err => {
    console.error('Failed to start server:', err)
    process.exit(1)
})
