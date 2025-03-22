import Option from "./Option.js";
class Helper {
    static async restart() {
        console.clear();
        await import("./App.js").then((module) => module.default.start());
    }
    static pending(message) {
        console.clear();
        if (message) {
            console.log(message);
        }
    }
    static delayRestart(message) {
        console.log(message);
        setTimeout(async () => {
            await this.restart();
        }, 1000);
    }
    static logActionsAndClear(data) {
        console.clear();
        console.table(data);
        console.log('-----\n');
        Option.log();
    }
}
export default Helper;
