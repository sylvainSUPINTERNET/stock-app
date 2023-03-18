


/**
 * percentChange = ((currentPrice - previousClose) / previousClose) * 100
 * previous day 24h close / current price * 100 => provide increase % for last 24h
 * @param currentPrice 
 * @param previousClose 
 * @returns 
 */
export const increasePercentForToday = (currentPrice:number, previousClose:number) => {
    return ((currentPrice - previousClose) / previousClose) * 100;
}



