import {chromium, Browser, Page} from 'playwright'
import { PageData } from './types';
import fs from 'fs'
import path from 'path'

export class Extract {
    async extract(url: string, takeScreenshot: boolean = false, browser: Browser): Promise<PageData>{
        const page = await browser.newPage()

        try {
            await page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            })
            await page.waitForTimeout(2000) // 2 seconds delay for snapshot
            const title = await page.title().catch(() => 'No Title')
            const description = await page.$eval('meta[name="description"]', (el) => {
                return el.getAttribute('content')
            }).catch(() => 'No Description')

            let screenshot: string = 'No Screenshot'
            if (takeScreenshot){
                const screenshotBuffer = await page.screenshot({
                    fullPage: true,
                    type: 'png'
                }).catch(() => null)
                if (screenshotBuffer) {
                    screenshot = screenshotBuffer.toString('base64')
                    const fs = require('fs');
                    const path = require('path');
                    const screenshotsDir = path.join(__dirname, '..', 'screenshots');
                    if (!fs.existsSync(screenshotsDir)) {fs.mkdirSync(screenshotsDir)}
                    const filename = `screenshot_${Date.now()}.png`;
                    fs.writeFileSync(path.join(screenshotsDir, filename), screenshotBuffer);
                    // fs.writeFileSync('screenshot.txt', screenshot); to read base64 string
                }
            }
            const status = title !== 'No Title' && description !== 'No Description' && screenshot != 'No Screenshot' ? 'success': 'partial'
            
            return {url, title, description, screenshot, status}
        } catch{
            return {
                url, 
                title: '', 
                description: '', 
                screenshot: '', 
                error: `Error Extracting ${url}`, 
                status: 'fail'
            }
        } finally{
            await page.close()
        }
    }

    async handleUrls(urls: string[], takeScreenshot: boolean = false): Promise<PageData[]>{   
        const browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
        const maxBatchSize = 5
        const results = []
        for (let i = 0; i < urls.length; i += maxBatchSize){
            const batchedPromises = urls.slice(i, maxBatchSize + i).map(url => this.extract(url, takeScreenshot, browser))
            const fetchedData = await Promise.all(batchedPromises)
            results.push(...fetchedData)
        }      

        await browser.close()
        return results
    }
}