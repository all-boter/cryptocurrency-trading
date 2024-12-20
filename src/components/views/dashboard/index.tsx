import { calculateGain, minus } from "@/common/utiles-math";
import { traderApi } from "@/services/traderApi";
import { Candle, formatTimestampToDate, SignalAlias, SignalType, TradeType } from "@/services/types";
import { useEffect, useRef, useState } from "react";
import signalsQueue from "./signalsQueue";

export const Dashboard = () => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const [tradeSignals, setTradeSignals] = useState<Candle[]>([]);

  useEffect(() => {
    if (!eventSourceRef.current) {
      createEventSource();
    }

    setTradeSignals([...signalsQueue.getQueue()]);

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  const createEventSource = () => {
    const eventSource = new EventSource(`${traderApi.streamSignal}`, { withCredentials: false });
    eventSourceRef.current = eventSource;

    eventSource.onmessage = ({ data }) => {
      try {
        const parsedData = JSON.parse(data)?.data as Candle;
        if (parsedData?.type === "close") {
          console.log("%c=log-close", "color:red");
          eventSource.close();
          eventSourceRef.current = null;
        } else if (parsedData?.type === "signal") {
          const newSignal = {
            symbol: parsedData.symbol,
            openTime: formatTimestampToDate(parsedData.openTime),
            signalTypeText: SignalAlias.get(parsedData.signalType),
            signalType:parsedData.signalType,
            gain: calculateGain(parsedData.preClose, parsedData.close),
            amplitude: calculateGain(parsedData.low, parsedData.high),
            period: parsedData.period,
            tradeType: parsedData.tradeType,
            close: parsedData.close,
            quoteVolume: parsedData.quoteVolume,
            high: parsedData.high,
            low: parsedData.low,
            percentage: parsedData.percentage,
            currentQuoteVolume: parsedData.currentQuoteVolume,
          };

          // 添加信号到队列，并更新状态
          signalsQueue.add(newSignal);
          setTradeSignals([...signalsQueue.getQueue()]);
        }
      } catch (error) {
        console.error("Failed to parse data:", error, data);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSourceRef.current = null;
      eventSource.close();
    };
  };

  const toBinanceMarket = (symbol: string) => {
    window.open(`https://www.binance.com/en/trade/${symbol}`, '_blank');
  };

  return (
    <>
      <h1 className="my-4 text-xl font-bold">Dashboard</h1>

      <div>
        {tradeSignals.map((item, i) => (
          <div key={i} className="signal-item border px-4 pb-2 mb-2 rounded-md shadow-md">
            <h2 className="text-lg font-bold">
              <span onClick={() => toBinanceMarket(item.symbol)} className="text-blue-600/100 cursor-pointer hover:text-blue-600">{item.symbol}</span> - {item.openTime}&nbsp;
              <span className={item.signalType === SignalType.HEAVY_VOLUME_RISE ? 'text-[#2ebd85]' : 'text-[#f6465d]'}>{item.signalType}</span>
            </h2>
            <p>Period: <span className="text-blue-600/100">{item.period}</span></p>
            <p>Trade Type: {item.tradeType === TradeType.Spot ? "Spot" : "Futures"}</p>
            <p>Close Price: ${item.close}</p>
            <p>Quote Volume: {item.quoteVolume}</p>
            <p>Increase: {item.gain}%</p>
            <p>Amplitude: {item.amplitude}%</p>
            <p>24h Change: {item.percentage}%</p>
            <p>Current Volume: ${(item.currentQuoteVolume / 1000000).toFixed(2)}M</p>
          </div>
        ))}
      </div>
    </>
  );
};
