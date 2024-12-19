
/*
{
    "type": "connection",
    "message": "SSE connection established",
    "timestamp": 1734588965151
}

{
    "type": "signal",
    "signalType": "HEAVY_VOLUME_RISE",
    "preClose": 0.01508,
    "currentClose": 0.01508,
    "currentQuoteVolume": 7578773.8559,
    "percentage": -5.632,
    "period": "1m",
    "openTime": 1734588960000,
    "closeTime": 1734589019999,
    "open": 0.01509,
    "close": 0.01508,
    "high": 0.01509,
    "low": 0.01507,
    "volume": 173808,
    "quoteVolume": 2620.5814,
    "buyVolume": 21827,
    "quoteBuyVolume": 329.23672,
    "symbol": "TLMUSDT"
}
*/
export type Period = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';

export enum SignalType {
  /**
   * 放量上涨
   */
  HEAVY_VOLUME_RISE = "HEAVY_VOLUME_RISE",
  /**
   * 放量下跌
   */
  HEAVY_VOLUME_DECLINE = "HEAVY_VOLUME_DECLINE"
}

export const SignalAlias = new Map([
  [SignalType.HEAVY_VOLUME_RISE, 'rising on heavy vol.'],
  [SignalType.HEAVY_VOLUME_DECLINE, 'falling on heavy vol.'],
])

// export const SignalAlias = new Map([
//   [SignalType.HEAVY_VOLUME_RISE, '放量上涨'],
//   [SignalType.HEAVY_VOLUME_DECLINE, '放量下跌'],
// ])

export enum TradeType {
  Futures = "Futures",
  Spot = "Spot"
}

export interface Candle {
  signalType: SignalType
  type: 'signal' | 'connection' | 'close'
  preClose: number

  tradeType: TradeType
  currentClose: number
  currentQuoteVolume: number
  percentage: string

  period: Period; // The time period for the candle (e.g., 1 minute, 5 minutes, etc.)
  /**
   * The timestamp when the candle opened (in milliseconds since epoch).
   */
  openTime: number;
  /**
   * The timestamp when the candle closed (in milliseconds since epoch).
   */
  closeTime: number;
  /**
   * The price at which the candle opened.
   */
  open: number;
  /**
   * The price at which the candle closed.
   */
  close: number;
  /**
   * The highest price reached during the candle's period.
   */
  high: number;
  /**
   * The lowest price reached during the candle's period.
   */
  low: number;
  /**
   * The total trading volume during the candle's period.
   */
  volume: number;
  /**
   * The total quote asset volume (value of trades) during the candle's period.
   */
  quoteVolume: number;
  /**
   * The volume of trades initiated by buyers during the candle's period.
   */
  buyVolume: number;
  /**
   * The value of trades initiated by buyers during the candle's period.
   */
  quoteBuyVolume: number;
  /**
   * The trading symbol (e.g., BTC/USD).
   */
  symbol: string;
  /**
   * Additional time-related metadata for the candle.
   */
  time: Date;
}

export function formatTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp);
  const padZero = (num: number): string => num.toString().padStart(2, '0');

  const month = padZero(date.getMonth() + 1); // 月份从0开始，所以+1
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${month}-${day} ${hours}:${minutes}:${seconds}`;
}
