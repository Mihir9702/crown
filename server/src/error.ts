import { Express, Request, Response, ErrorRequestHandler } from 'express'

const error = (app: Express) => {
  app.use((_, res: Response) => {
    res.status(404).json({
      error: 'This route does not exist',
    })
  })

  app.use((err: ErrorRequestHandler, req: Request, res: Response) => {
    console.error('ERROR', req.method, req.path, err)

    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal server error. Check the server console',
      })
    }
  })
}

export default error
