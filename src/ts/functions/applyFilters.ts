import { Product } from '../models/Product'
import { ProductStore } from '../models/ProductStore'
import renderProducts from '../renders/renderProducts'
import sortProducts from './sortProducts'

export function applyFilters(store: ProductStore) {
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(
        input => (input as HTMLInputElement).value,
    )
    const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(
        input => (input as HTMLInputElement).value,
    )
    const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(
        input => (input as HTMLInputElement).value,
    )

    const filteredProducts: Product[] = store.currentProducts.filter(product => {
        const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color)
        const matchesSize = selectedSizes.length === 0 || product.size.some(size => selectedSizes.includes(size))
        const matchesPrice =
            selectedPrices.length === 0 ||
            selectedPrices.some(priceRange => {
                const [min, max] = priceRange.split('-').map(Number)
                return product.price >= (min || 0) && (max ? product.price <= max : true)
            })

        return matchesColor && matchesSize && matchesPrice
    })

    const sortBy = (document.getElementById('select-sort') as HTMLSelectElement).value || ''
    const sortedProducts = sortProducts(filteredProducts, sortBy)

    store.displayedProducts = sortedProducts
    renderProducts(sortedProducts)
}
