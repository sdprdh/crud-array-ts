import Option from "./Option.js";
import { Question } from "./Question.js";
import Store from "./Store.js";
import Product from "./Product.js";
import App from "./App.js";
class ProductHandler extends App {
    static async addProduct() {
        this.pending('Add product');
        Option.logProductOptions();
        const add = async () => {
            const name = await new Question("Name: ").ask();
            const price = await new Question("Price: ", true).ask();
            const product = new Product(+new Date(), name, price);
            Store.add(product);
        };
        const option = await new Question("Masukkan pilihan: ", true).ask();
        switch (option) {
            case 1:
                this.pending('Add product/Add one');
                await add();
                break;
            case 2:
                while (true) {
                    this.pending('Add product/Add multiple');
                    await add();
                    const more = await new Question("Add more? (y/n): ").ask();
                    if (more.toUpperCase() !== 'Y') {
                        break;
                    }
                }
                break;
            case 3:
                await this.restart();
                return;
            default:
                console.error('Option not found');
        }
        await this.restart();
    }
    static async logStore() {
        const stores = Store.getSotre();
        if (stores.length < 1) {
            console.log('Stores is empty');
            return;
        }
        const formattedStores = stores.map((product, index) => ({
            No: index + 1,
            ID: product.id,
            Name: product.name,
            Price: product.price
        }));
        console.clear();
        console.table(formattedStores);
        console.log('-----\n');
        Option.log();
    }
}
export default ProductHandler;
