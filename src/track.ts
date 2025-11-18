import {Request, Response} from 'express'
import {Extract} from './extract'
import {PageReq, PageData} from './types'

export class Track{
    extract: Extract;
    
    constructor(){
        this.extract = new Extract()
    }

    async validatePages(req: Request, res: Response): Promise<void> {
        try {
            const {urls, takeScreenshot = false}: PageReq = req.body
            let maxLimit = 100
            const limitedUrls = urls.slice(0, maxLimit)
            if (!limitedUrls || !limitedUrls.length) {
                res.status(400).json({error: 'Must Include At Least 1 URL'})
                return
            }
    
            const validUrls = limitedUrls.map((url: string)=> {
                if (url.startsWith('https://') || url.startsWith('http://')) return url
                return 'https://' + url
            })
            
            const results = await this.extract.handleUrls(validUrls, takeScreenshot)
            res.json(results)
        }
        catch(error){
            res.status(500).json({
                error: 'Error track.ts',
                message: 'Failed to Validate Pages'
            })
        }
    }
}