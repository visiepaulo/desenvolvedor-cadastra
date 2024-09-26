import { ProductStore } from '../models/ProductStore'
import { applyFilters } from './applyFilters'

export default function setupSortListeners(store: ProductStore) {
    const sortSelect = document.getElementById('select-sort') as HTMLSelectElement
    const sortButtons = Array.from(document.querySelectorAll('.sort-content button'))

    sortSelect.addEventListener('change', () => {
        applyFilters(store)
    })

    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            sortSelect.value = button.id
            applyFilters(store)
            document.querySelector('#sort')?.classList.remove('open')
        })
    })
}
