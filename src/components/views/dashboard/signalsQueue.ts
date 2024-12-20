class SignalsQueue {
  private queue: any[] = [];
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.loadFromStorage();
  }

  private loadFromStorage() {
    // sessionStorage
    const storedSignals = localStorage.getItem('tradeSignals');
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
    this.saveToStorage();
  }

  private saveToStorage() {
    // sessionStorage
    localStorage.setItem('tradeSignals', JSON.stringify(this.queue));
  }

  // 获取当前队列
  public getQueue() {
    return this.queue;
  }
}

// 最大100条信号
const signalsQueue = new SignalsQueue(100);

export default signalsQueue;