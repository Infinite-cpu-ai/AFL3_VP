import express from 'express'
import { PORT } from './utils/env-util'
import publicApi from './routes/public-api'
import { errorMiddleware } from './middleware/error-middleware'

const app = express()

// Middleware
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// Public API grouped routes
app.use('/api', publicApi)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' })
})

app.use(errorMiddleware)

app.listen(PORT || 3000, () => {
  console.log(`Connected to port ${PORT}`)
}
)