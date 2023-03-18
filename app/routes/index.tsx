import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DetailSymbolResponse, FinnhubCurrentPriceResponseAllSettled, getStockSymbol } from "~/services/finnhub.server";
import { increasePercentForToday } from "~/utils/computeStock";



type LoaderData = {
  data: Awaited<ReturnType<typeof getStockSymbol>>;
}

export const loader = async () => {
  return json<LoaderData>({
    data: await getStockSymbol(["NVDA", "RE", "GWW"], "cg6ekq9r01qjg4hg7i6gcg6ekq9r01qjg4hg7i70")
  });
};



export default function Index() {
  const {data} = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold  bg-gray-100 m-5 rounded p-5">Stock</h1>


      <div className="container mx-auto">
        {
          data.map((symbolResponse: FinnhubCurrentPriceResponseAllSettled, index:number) => {
            return (
              <div key={index} className="bg-gray-100 m-5 rounded p-5">
                {
                  symbolResponse?.value && symbolResponse?.value.o && symbolResponse?.value.c && 
                  <div>
                    <p>{symbolResponse?.value.symbol} {increasePercentForToday(symbolResponse?.value.c, symbolResponse?.value.pc)}</p>
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
