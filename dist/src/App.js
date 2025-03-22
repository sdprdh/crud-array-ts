import Option from "./Option.js";
import { Question, rl } from "./Question.js";
import Action from "./Action.js";
class App extends Action {
    static running = true;
    static async start() {
        Option.log();
        while (this.running) {
            const option = await new Question("Select: ", true).ask();
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
                    await this.deleteProduct();
                    break;
                case 5:
                    await this.getProducts();
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
