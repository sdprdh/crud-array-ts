import Option from "./Option.js";

class Helper {
    protected static async restart(): Promise<void> {
        console.clear();
        await import("./App.js").then((module): Promise<void> => module.default.start());

    }

    protected static pending(message?: string): void {
        console.clear();
        if (message) {
            console.log(message);
        }
    }

    protected static delayRestart(message: string): void {
        console.log(message);
        setTimeout(async () => {
            await this.restart();
        }, 1000)
    }

    protected static logActionsAndClear(data?: any): void {
        console.clear();
        console.table(data);
        console.log('-----\n');
        Option.log();
    }
}

export default Helper;