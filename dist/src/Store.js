import Product from "./Product.js";
class Store {
    static stores = [];
    static add(newProduct) {
        this.stores = [newProduct, ...this.stores];
    }
    static get(id) {
        return this.stores.find((product) => product.id === id) || null;
    }
    static update(id, updatedProduct) {
        this.stores = this.stores.map((product) => product.id === id ? { ...product, ...updatedProduct } : product);
    }
    static delete(id) {
        this.stores = this.stores.filter((product) => product.id !== id);
    }
    static getStore() {
        return this.stores;
    }
}
export default Store;
