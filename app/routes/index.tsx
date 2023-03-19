import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { DetailSymbolResponse, FinnhubCurrentPriceResponseAllSettled, getStockSymbol } from "~/services/finnhub.server";
import { increasePercentForToday, statusStockColor } from "~/utils/computeStock";



type LoaderData = {
  data: Awaited<ReturnType<typeof getStockSymbol>>;
  resp: boolean;
}

export const loader = async () => {
  return json<LoaderData>({
    data: await getStockSymbol(["NVDA", "RE", "GWW"], ""),
    resp: true
  });
};





export default function Index() {
/*   const {data} = useLoaderData();
 */

  const supaClient = createClient("https://apdoqaanztaqwlxreavk.supabase.co", "");

  supaClient.from("invest_follow").select("*").then((data) => {
    console.log("ici");
    console.log(data);
  });

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold  bg-gray-100 m-5 rounded p-5">Stock</h1>




      <div className="container mx-auto">

      <div className="p-5">
        <div className="flex justify-between">
          <p className="text-xl font-bold">TOTAL</p>
          <p className="text-xl">366 USD</p>
        </div>

        <hr className="mt-5 mb-5"></hr>

        <div className="flex justify-between">
          <p className="text-xl font-bold">ORDERS</p>
          <ul>
            <li>Transaction 1</li>
            <li>Transaction 1</li>
            <li>Transaction 1</li>
            <li>Transaction 1</li>
          </ul>
        </div>

        <hr className="mt-5 mb-5"></hr>
      </div>

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
