import { calculateGain, minus } from "@/common/utiles-math";
import { traderApi } from "@/services/traderApi";
import { Candle, formatTimestampToDate, SignalAlias, TradeType } from "@/services/types";
import { useEffect, useRef, useState } from "react";

export const Dashboard = () => {
  const eventSourceRef = useRef<EventSource | null>(null);

  const [tradeSignals, setTradeSignals] = useState<Candle[]>([]);

  useEffect(() => {
    if (!eventSourceRef.current) {
      createEventSource()
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [])

  const createEventSource = () => {
    const eventSource = new EventSource(`${traderApi.streamSignal}`, { withCredentials: false });
    eventSourceRef.current = eventSource;

    eventSource.onmessage = ({ data }) => {
      try {
        const parsedData = JSON.parse(data)?.data as Candle;
        if (parsedData?.type === 'close') {
          console.log('%c=log-close', 'color:red');
          eventSource.close();
          eventSourceRef.current = null;
        } else {
          // const logText = parsedData.msg || '';
          console.log('%c=parsedData:', 'color:red', parsedData)
          if(parsedData?.type === 'signal'){
            // setSignals((prev) => prev + logText);
            console.log('log mark down',{
              title: `${parsedData.symbol} ${SignalAlias.get(parsedData.signalType)}`,
              content: `- Period:${parsedData.period}, ${parsedData.tradeType === TradeType.Spot ? 'Spot' : 'Futures'} $${parsedData.close}
        - Time:${formatTimestampToDate(parsedData.openTime)}
        - QuoteVol: ${parsedData.quoteVolume}
        - Increase:${calculateGain(parsedData.preClose, parsedData.close)}%,Amplitude:${calculateGain(parsedData.low, parsedData.high)}%
        - Close:$${parsedData.close},Change:${minus(parsedData.high, parsedData.low)}
        - 24h:${parsedData.percentage}% vol: $${(parsedData.currentQuoteVolume / 1000000).toFixed(2)}M`,
            })
          }
        }
      } catch (error) {
        console.error('Failed to parse data:', error, data);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      eventSourceRef.current = null;
      eventSource.close();
    };
  };

  return <div>
    dashboard
    {tradeSignals.map((item, i) => {
      return <div key={i}>
        {item.symbol} - {item.openTime}
      </div>
    })}
  </div>
}