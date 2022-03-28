import { createServer } from 'http'
import app from './server'

createServer(app).listen(process.env.PORT, () => {
	console.log(`🚀 Server is listening on port: ${process.env.PORT} 🚀`)
	console.log(`🚀 Server is listening on mode: ${process.env.NODE_ENV} 🚀`)
})
