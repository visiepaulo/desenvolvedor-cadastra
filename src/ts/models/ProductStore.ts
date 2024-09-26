import { Product } from './Product'

export class ProductStore {
    private productsPerPage = 9
    public currentProducts: Product[] = []
    public displayedProducts: Product[] = []

    public setProducts(products: Product[]) {
        this.currentProducts = products
        this.displayedProducts = products.slice(0, this.productsPerPage)
    }

    public showMoreProducts() {
        const totalDisplayed = this.displayedProducts.length
        const nextProducts = this.currentProducts.slice(totalDisplayed, totalDisplayed + this.productsPerPage)
        this.displayedProducts.push(...nextProducts)
    }
}
