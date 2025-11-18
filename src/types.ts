export interface PageData {
    url: string;
    title: string;
    description: string;
    screenshot?: string;
    error?: string;
    status: 'success' | 'fail' | 'partial'
}

export interface PageReq {
    urls: string[];
    takeScreenshot?: boolean
}

export interface PageRes {
    results: PageData[];
}