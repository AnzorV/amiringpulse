import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import DataTable from "@/components/DataTable";
import { CoinOverviewFallback } from "@/components/home/fallback";

const CoinOverview = async () => {
  let coin;
  try {
    coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
      dex_pair_format: "symbol",
    });
  } catch (error) {
    // Log the error for observability; upstream Error Boundaries won't be triggered synchronously
    console.error("Failed to fetch CoinOverview data:", error);
    // Render a safe fallback UI so the render never throws synchronously
    return <CoinOverviewFallback />;
  }
  return (
    <div id="coin-overview">
      <div className="header pt-2">
        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
        <div className="info">
          <p>
            {coin.name} / {coin.symbol.toUpperCase()}
          </p>
          <h1>{formatCurrency(coin.market_data.current_price.gbp)}</h1>
        </div>
      </div>
    </div>
  );
};
export default CoinOverview;
