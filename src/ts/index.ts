// API
import fetchProducts from './api/fetchProducts'

// FUNCTIONS
import isProduct from './functions/isProduct'
import extractFilters from './functions/extractFilters'
import setupFilterListeners from './functions/setupFilterListeners'
import setupSortListeners from './functions/setupSortListeners'
import setupCartListeners from './functions/setupCartListeners'
import loadCartFromLocalStorage from './functions/loadCartFromLocalStorage'
import { clickListeners } from './functions/clickListeners'

// MODEL
import { ProductStore } from './models/ProductStore'

// RENDER
import renderFilters from './renders/renderFilters'
import renderProducts from './renders/renderProducts'

const serverUrl = 'http://localhost:5000'

const store = new ProductStore()

async function main() {
    console.log(serverUrl)

    clickListeners()

    loadCartFromLocalStorage()

    const products = await fetchProducts()
    const validProducts = products.filter(isProduct)

    store.setProducts(validProducts)
    renderProducts(store.displayedProducts)

    const { colors, sizes } = extractFilters(validProducts)
    renderFilters(colors, sizes)

    setupFilterListeners(store)
    setupSortListeners(store)
    setupCartListeners()

    const loadMoreButton = document.getElementById('load-more') as HTMLButtonElement

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', () => {
            console.log('Carregar mais produtos')
            store.showMoreProducts()
            renderProducts(store.displayedProducts)

            if (store.displayedProducts.length === store.currentProducts.length) {
                loadMoreButton.style.display = 'none'
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', main)
