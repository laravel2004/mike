export default class Timer {
    constructor() {
        this.count = 0;
        this.intervalId = null;
    }

    start() {
        if (this.intervalId !== null) {
            return;
        }
        this.intervalId = setInterval(() => {
            this.count += 1;
            console.log(this.count);
        }, 1000);
    }

    stop() {
        if (this.intervalId === null) {
            return;
        }
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    setSecond(second) {
        // this.stop();
        this.count = second;
    }

    reset() {
        this.stop();
        this.count = 0;
    }
}