import { calculateGain, minus } from "@/common/utiles-math";
import { traderApi } from "@/services/traderApi";
import { Candle, formatTimestampToDate, SignalAlias, TradeType } from "@/services/types";
import { useEffect, useRef, useState } from "react";
import signalsQueue from "./singnalsQueue";

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
            signalType: SignalAlias.get(parsedData.signalType),
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

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {tradeSignals.map((item, i) => (
          <div key={i} className="signal-item border p-4 mb-2 rounded-md shadow-md">
            <h2 className="text-lg font-bold">
              {item.symbol} - {item.openTime}
            </h2>
            <p>Signal Type: {item.signalType}</p>
            <p>Period: {item.period}</p>
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
    </div>
  );
};
