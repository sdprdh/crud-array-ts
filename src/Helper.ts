import Option from "./Option.js";
import {Question} from "./Question.js";
import Product from "./Product.js";
import Store from "./Store.js";

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

    protected static async checkProduct(isReturn: boolean = false): Promise<Product | undefined> {
        const id: number = await new Question<number>("id: ", true).ask();
        const product: Product | null = Store.get(id);

        if (!product) {
            this.delayRestart('Id is not valid');
            return undefined;
        }

        return isReturn ? product : undefined;
    }
}

export default Helper;