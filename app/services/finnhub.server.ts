export interface FinnhubCurrentPriceResponse  {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
}

export interface DetailSymbolResponse extends FinnhubCurrentPriceResponse {
    symbol: string;
}

export interface FinnhubCurrentPriceResponseAllSettled  {
    status: 'fulfilled' | 'rejected';
    value?: DetailSymbolResponse;
}
 


export async function getStockSymbol(symbols:string[], apiKeyFinnhub: string): Promise<PromiseSettledResult<DetailSymbolResponse | null | undefined>[]> {
    const resp = await Promise.allSettled(
        symbols.map(symbol =>
            fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKeyFinnhub}`)
        )
    );

    return Promise.allSettled(
        resp.map(async (res, i:number) => {
            if (res.status === 'fulfilled') {
                const resp = res.value;
                
                if ( resp.status == 200 ) {
                    const fullDetail: DetailSymbolResponse = {
                        ...await resp.json() as unknown as FinnhubCurrentPriceResponse,
                        symbol: symbols[i],
                    };
                    
                    return fullDetail;
                }
            } else {
                console.log("error -> " + res.reason)
                return null;
            }
        })
    ); 
}