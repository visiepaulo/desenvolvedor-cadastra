import { Product } from '../models/Product'

export default function extractFilters(products: Product[]) {
    const colorsSet = new Set<string>()
    const sizesSet = new Set<string>()

    products.forEach(product => {
        colorsSet.add(product.color)
        product.size.forEach(size => sizesSet.add(size))
    })

    return {
        colors: Array.from(colorsSet),
        sizes: Array.from(sizesSet),
    }
}
