import { ReactElement } from "react";



/**
 * percentChange = ((currentPrice - previousClose) / previousClose) * 100
 * previous day 24h close / current price * 100 => provide increase % for last 24h
 * @param currentPrice 
 * @param previousClose 
 * @returns 
 */
export const increasePercentForToday = (currentPrice:number, previousClose:number):ReactElement<any, any> => {

    const result = parseFloat( (((currentPrice - previousClose) / previousClose) * 100).toFixed(2) );

    if ( result > 0 ) {
        return (<p className={`font-bold text-green-600`}>+{result}</p>);
    } else if ( result === 0 ) {
        return (<p className={`font-bold`}>{result}</p>);
    } else {
        return (<p className={`font-bold text-red-600`}>{result}</p>);
    }
}



/**
 * return color for stock status
 * @param currentPrice 
 * @param previousClose 
 * @returns 
 */
export const statusStockColor = (currentPrice:number, previousClose:number): string => {
    const BORDER_SIZE = "4"
    if ( parseFloat( (((currentPrice - previousClose) / previousClose) * 100).toFixed(2) ) > 0 ) {
        return `border-r-${BORDER_SIZE}  border-r-green-500`;
    }

    return `border-r-${BORDER_SIZE}  border-r-red-500`;
}

