import compression from 'compression'
import cors from 'cors'
import express, { Request, Response } from 'express'
import morgan from 'morgan'

class Server {
	public app: express.Application

	constructor() {
		this.app = express()
		this.middleware()
		this.routes()
	}

	private async middleware() {
		this.app.use(cors())

		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(express.json())

		this.app.use(compression())
		this.app.use(morgan('dev'))
	}

	private async routes() {
		// healthz
		this.app.get('/api/v1/healthz', async (req: Request, res: Response) => {
			return res.json({
				status: 'ok',
				env: process.env.NODE_ENV,
				server_name: process.env.SERVER_NAME
			})
		})
	}
}

export default new Server().app
