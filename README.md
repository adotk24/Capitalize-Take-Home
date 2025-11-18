# Capitalize Take Home

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browser
npx playwright install chromium

# Running Server
npm run dev

# Example Request
{
  "urls": ["https://walmart.com", "target.com", "whataburger.com"],
  "takeScreenshots": true
}

#Example Response
[
  {
    "url": "https://espn.com",
    "title": "ESPN - Serving Sports Fans. Anytime. Anywhere.",
    "description": "Visit ESPN for live scores, highlights and sports news. Stream exclusive games on ESPN and play fantasy sports.",
    "screenshot": "J7itIjSPY...",
    "status": "success"
  },
  {
    "url": "https://whataburger.com",
    "title": "Whataburger | Order Online with Curbside and Delivery",
    "description": "No Description",
    "screenshot": "0NqrFGSNl...",
    "status": "partial"
  },
  {
    "url": "https://walmart.com",
    "title": "Walmart | Save Money. Live better.",
    "description": "Shop Walmart.com today for Every Day Low Prices. Join Walmart+ for unlimited free delivery from your store & free shipping with no order minimum. Start your free 30-day trial now!",
    "screenshot": "qVp67K...",
    "status": "success"
  }
]

#Assumptions
1. Allowing pages ~30 seconds to load
2. Only allowing 100 websites per request
3. takeScreenshot variable applies to whole batch of data, and not each individually
4. No need to use env file for port number
5. URLS may fail normalization
6. Screenshots only need to be saved as string
7. Only want 5 concurrent scrapes at a time

