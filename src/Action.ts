import {Question} from "./Question.js";
import Option from "./Option.js";
import Store from "./Store.js";
import Product from "./Product.js";
import Helper from "./Helper.js";

class Action extends Helper {
    protected static async addProduct(): Promise<void> {
        this.pending('Add product')
        Option.logProductOptions();

        const add = async (): Promise<void> => {
            const name: string = await new Question<string>("Name: ").ask();
            const price: number = await new Question<number>("Price: ", true).ask();

            const product: Product = new Product(+new Date(), name, price);
            Store.add(product);
        }

        const option: number = await new Question<number>("Select: ", true).ask();

        switch (option) {
            case 1:
                this.pending('Add product/Add one');
                await add()
                break;
            case 2:
                while (true) {
                    this.pending('Add product/Add multiple');
                    await add()

                    const more: string = await new Question<string>("Add more? (y/n): ").ask();

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

    protected static async updateProduct(): Promise<void> {
        this.pending('Update product');
        const product: Product | undefined = await this.checkProduct(true);

        if (!product) {
            console.log("Product not found");
            return;
        }

        const name: string = await new Question<string>(`Name before(${product.name}): `).ask();
        const price: number = await new Question<number>(`Price before(${product.price}): `, true).ask();

        Store.update(product.id, {
            name: name.length > 0 ? name : product.name,
            price,
        });

        await this.restart()
    }

    protected static async getProduct(): Promise<void> {
        this.pending('Detail product');

        if (Store.getStore().length < 1) {
            return this.delayRestart('Store is empty');
        }

        const product: Product | undefined = await this.checkProduct(true);

        if (!product) {
            console.log("Product not found");
            return;
        }

        this.logActionsAndClear(product);
    }

    protected static async deleteProduct(): Promise<void> {
        this.pending('Delete product');

        const product: Product | undefined = await this.checkProduct(true);

        if (!product) {
            console.log("Product not found");
            return;
        }

        Store.delete(product.id);

        await this.restart()
    }

    protected static async getProducts(): Promise<void> {
        const stores: Product[] = Store.getStore();

        if (stores.length < 1) {
            return this.delayRestart('Store is empty');
        }

        const formattedStores = stores.map((product: Product, index: number) => ({
            No: index + 1,
            ID: product.id,
            Name: product.name,
            Price: product.price
        }));

        this.logActionsAndClear(formattedStores);
    }
}

export default Action;
