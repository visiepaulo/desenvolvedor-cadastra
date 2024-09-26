// API
import fetchProducts from './api/fetchProducts'

// FUNCTIONS
import isProduct from './functions/isProduct'
import extractFilters from './functions/extractFilters'
import setupFilterListeners from './functions/setupFilterListeners'
import setupSortListeners from './functions/setupSortListeners'
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

    const products = await fetchProducts()
    const validProducts = products.filter(isProduct)

    store.setProducts(validProducts)
    renderProducts(store.displayedProducts)

    const { colors, sizes } = extractFilters(validProducts)
    renderFilters(colors, sizes)

    setupFilterListeners(store)
    setupSortListeners(store)

    // const loadMoreButton = document.getElementById('load-more')

    // if (loadMoreButton) {
    //     loadMoreButton.addEventListener('click', showMoreProducts)
    // }
}

document.addEventListener('DOMContentLoaded', main)
