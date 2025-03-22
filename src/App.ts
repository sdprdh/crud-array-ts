import Option from "./Option.js";
import {Question, rl} from "./Question.js";
import Action from "./Action.js";

class App extends Action {
    private static running: boolean = true;

    public static async start(): Promise<void> {
        Option.log();

        while (this.running) {
            const option: number = await new Question<number>("Select: ", true).ask();

            switch (option) {
                case 1:
                    await this.addProduct();
                    break;
                case 2:
                    await this.updateProduct();
                    break;
                case 3:
                    await this.getProduct();
                    break;
                case 4:
                    await this.deleteProduct()
                    break;
                case 5:
                    await this.getProducts()
                    break;
                case 6:
                    console.clear();
                    rl.close();
                    this.running = false;
                    break;
                default:
                    console.error('Option not found');
            }
        }
    }
}

export default App;