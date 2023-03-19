import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DetailSymbolResponse, FinnhubCurrentPriceResponseAllSettled, getStockSymbol } from "~/services/finnhub.server";
import { increasePercentForToday, statusStockColor } from "~/utils/computeStock";



type LoaderData = {
  data: Awaited<ReturnType<typeof getStockSymbol>>;
}

export const loader = async () => {
  return json<LoaderData>({
    data: await getStockSymbol(["NVDA", "RE", "GWW"], "cg6ekq9r01qjg4hg7i6gcg6ekq9r01qjg4hg7i70")
  });
};



export default function Index() {
/*   const {data} = useLoaderData();
 */

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold  bg-gray-100 m-5 rounded p-5">Stock</h1>


      <div className="container mx-auto">
        {
          // data.map((symbolResponse: FinnhubCurrentPriceResponseAllSettled, index:number) => {
            [
              { value: {
                c: 257.25,
                d: 1.84,
                dp: 0.7204,
                h: 263.99,
                l: 256.68,
                o: 259.82,
                pc: -255.41,
                t: 1679083206,
                symbol: 'NVDA'
              }},
              { value: {
                c: 257.25,
                d: 1.84,
                dp: 0.7204,
                h: 263.99,
                l: 256.68,
                o: 259.82,
                pc: 255.41,
                t: 1679083206,
                symbol: 'NVDA'
              }}
            ].map((symbolResponse: any, index:number) => {
            return (
              <div key={index} className={`bg-gray-100 m-5 rounded p-5 ${statusStockColor(symbolResponse?.value.c, symbolResponse?.value.pc)}`}>
                {
                  symbolResponse?.value && symbolResponse?.value.o && symbolResponse?.value.c && 
                  <div className="">
                    <p className="text-2xl font-semibold">{symbolResponse?.value.symbol}</p>
                    <div className={`flex mt-5 text-xl`}>
                      <p>{increasePercentForToday(symbolResponse?.value.c, symbolResponse?.value.pc)}</p>
                    </div>
                  </div>
                }
              </div>
            );
          })
        }
      </div>



    </div>
  );
}
