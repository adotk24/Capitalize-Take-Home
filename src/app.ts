import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {Track} from './track'

const app = express()
const port = 3000

app.use(cors())
app.use(helmet()) 
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded({extended: true}))

const controller = new Track()

app.post('/track-pages', (req, res) => {
    controller.validatePages(req, res)
})

app.use((req, res) => {
    res.status(404).json({message: 'Endpoint not found!, Consider doing a post route to /track-pages!'})
})

app.listen(port, () => console.log(`Server running on port ${port}`))