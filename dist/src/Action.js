import { Question } from "./Question.js";
import Option from "./Option.js";
import Store from "./Store.js";
import Product from "./Product.js";
import Helper from "./Helper.js";
class Action extends Helper {
    static async addProduct() {
        this.pending('Add product');
        Option.logProductOptions();
        const add = async () => {
            const name = await new Question("Name: ").ask();
            const price = await new Question("Price: ", true).ask();
            const product = new Product(+new Date(), name, price);
            Store.add(product);
        };
        const option = await new Question("Select: ", true).ask();
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
                break;
            default:
                console.error('Option not found');
        }
        await this.restart();
    }
    static async updateProduct() {
        this.pending('Update product');
        const id = await new Question("id: ", true).ask();
        const product = Store.get(id);
        if (!product) {
            this.delayRestart('Id is not valid');
            return;
        }
        const name = await new Question(`Name before(${product.name}): `).ask();
        const price = await new Question(`Price before(${product.price}): `, true).ask();
        Store.update(id, {
            name: name.length > 0 ? name : product.name,
            price,
        });
        await this.restart();
    }
    static async getProduct() {
        this.pending('Detail product');
        const id = await new Question("id: ", true).ask();
        if (Store.getStore().length < 1) {
            return this.delayRestart('Store is empty');
        }
        const product = Store.get(id);
        if (!product) {
            return this.delayRestart('Id is not valid');
        }
        this.logActionsAndClear(product);
    }
    static async deleteProduct() {
        this.pending('Delete product');
        const id = await new Question("id: ", true).ask();
        const product = Store.get(id);
        if (!product) {
            this.delayRestart('Id is not valid');
            return;
        }
        Store.delete(id);
        await this.restart();
    }
    static async getProducts() {
        const stores = Store.getStore();
        if (stores.length < 1) {
            return this.delayRestart('Store is empty');
        }
        const formattedStores = stores.map((product, index) => ({
            No: index + 1,
            ID: product.id,
            Name: product.name,
            Price: product.price
        }));
        this.logActionsAndClear(formattedStores);
    }
}
export default Action;
