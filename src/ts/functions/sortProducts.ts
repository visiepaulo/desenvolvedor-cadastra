import { Product } from '../models/Product'

export default function sortProducts(products: Product[], sortBy: string): Product[] {
    const sortedProducts = [...products]

    switch (sortBy) {
        case 'recent':
            return sortedProducts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        case 'price-desc':
            return sortedProducts.sort((a, b) => a.price - b.price)
        case 'price':
            return sortedProducts.sort((a, b) => b.price - a.price)
        default:
            return sortedProducts
    }
}
