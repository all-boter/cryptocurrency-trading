class SignalsQueue {
  private queue: any[] = [];
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.loadFromSessionStorage();
  }

  // 从 sessionStorage 加载信号
  private loadFromSessionStorage() {
    const storedSignals = sessionStorage.getItem('tradeSignals');
    if (storedSignals) {
      this.queue = JSON.parse(storedSignals);
    }
  }

  // 添加信号到队列
  public add(signal: any) {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift(); // 移除最旧的信号
    }
    this.queue.push(signal);
    this.saveToSessionStorage();
  }

  // 保存队列到 sessionStorage
  private saveToSessionStorage() {
    sessionStorage.setItem('tradeSignals', JSON.stringify(this.queue));
  }

  // 获取当前队列
  public getQueue() {
    return this.queue;
  }
}

const signalsQueue = new SignalsQueue(100); // 最大100条信号

export default signalsQueue;