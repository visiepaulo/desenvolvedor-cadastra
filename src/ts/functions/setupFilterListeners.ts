import { ProductStore } from '../models/ProductStore'
import { applyFilters } from './applyFilters'

export default function setupFilterListeners(store: ProductStore) {
    const clearFiltersButton = document.getElementById('clear-filter')
    const colorCheckboxes = Array.from(document.querySelectorAll('input[name="color"]'))
    const sizeCheckboxes = Array.from(document.querySelectorAll('input[name="size"]'))
    const priceCheckboxes = Array.from(document.querySelectorAll('input[name="price"]'))
    const allCheckboxes = [...colorCheckboxes, ...sizeCheckboxes, ...priceCheckboxes]

    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => applyFilters(store))
    })

    if (clearFiltersButton) {
        clearFiltersButton.addEventListener('click', () => {
            allCheckboxes.forEach(checkbox => {
                ;(checkbox as HTMLInputElement).checked = false
            })
            applyFilters(store)
        })
    }
}
