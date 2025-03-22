import Product from "./Product.js";

class Store {
    private static stores: Product[] = [];

    public static add(newProduct: Product): void {
        this.stores = [newProduct, ...this.stores];
    }

    public static get(id: number): Product | null {
        return this.stores.find((product: Product) => product.id === id) || null;
    }

    public static update(id: number, updatedProduct: Partial<Product>): void {
        this.stores = this.stores.map((product) =>
            product.id === id ? {...product, ...updatedProduct} : product
        );
    }

    public static delete(id: number): void {
        this.stores = this.stores.filter((product) => product.id !== id);
    }

    public static getStore(): Product[] {
        return this.stores;
    }
}

export default Store;

