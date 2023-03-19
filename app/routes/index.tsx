import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { DetailSymbolResponse, FinnhubCurrentPriceResponseAllSettled, getStockSymbol } from "~/services/finnhub.server";
import { increasePercentForToday, statusStockColor } from "~/utils/computeStock";

// {"error":null,"data":[{"id":1,"total_invest":677.63,"created_at":"2023-10-31T23:00:01+00:00","gain_stock":null,"gain_crypto":null}],"count":null,"status":200,"statusText":"OK"}

type LoaderData = {
  data: Awaited<ReturnType<typeof getStockSymbol>>;
  report: Awaited<ReturnType<any>>;
}

export const loader = async () => {

  const supaClient = createClient("https://apdoqaanztaqwlxreavk.supabase.co", process.env.REACT_APP_SUPABASE_TOKEN!);
  

  return json<LoaderData>({
    data: await getStockSymbol(["NVDA", "RE", "GWW"], process.env.REACT_APP_FINNHUB_APIKEY! ),
    report: await supaClient.from("invest_follow").select("*")
  });
};





export default function Index() {
  const {data, report} = useLoaderData();
 


  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold  bg-gray-100 m-5 rounded p-5">Stock</h1>




      <div className="container mx-auto">

      <div className="p-5">
        <div className="flex justify-between">
          <p className="text-xl font-bold">TOTAL INVEST</p>
          <div>
          <input type="text" defaultValue={`${report?.data[0]?.total_invest}`} 
          onChange={ el => console.log("change")}></input>
          <button className="hidden">Update</button>
          </div>
        </div>


        <hr className="mt-5 mb-5"></hr>

        <div className="flex justify-between">
          <p className="text-xl font-bold">ORDERS</p>
          <ul>
            <li>order name amount type crypto or bourse date</li>
            <li>Transaction 1</li>
            <li>Transaction 1</li>
            <li>Transaction 1</li>
          </ul>
        </div>

        <hr className="mt-5 mb-5"></hr>

        <div className="flex justify-between">
          <p className="text-xl font-bold">GAIN STOCK</p>
          <p className="text-xl">366 USD</p>
        </div>

        <div className="flex justify-between mt-10">
          <p className="text-xl font-bold">GAIN CRYPTO</p>
          <p className="text-xl">366 USD</p>
        </div>

        <hr className="mt-5 mb-5"></hr>

      </div>


      <div>
        <h1>Crypto</h1>
      </div>

      <div className="">
        <h1>Stock</h1>
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
                },
              },
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
              },
            }
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



    </div>
  );
}
