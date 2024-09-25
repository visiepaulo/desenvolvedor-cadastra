// API
import fetchProducts from './api/fetchProducts'

// FUNCTIONS
import isProduct from './functions/isProduct'
import extractFilters from './functions/extractFilters'

// MODELS
import { Product } from './models/Product'

// RENDER
import renderFilters from './renders/renderFilters'

const serverUrl = 'http://localhost:5000'

export default function renderProducts(products: Product[]) {
    const container = document.getElementById('products')
    if (container) {
        container.innerHTML = ''
        displayedProducts = products.slice(0, productsPerPage)
        displayedProducts.forEach(product => {
            const productElement = document.createElement('a')
            productElement.className = 'product-card'
            productElement.href = '#'
            productElement.innerHTML = `
                <figure class="product-card__figure">
                    <img class="product-card__image" src="${product.image}" alt="${product.name}" />
                    <figcaption class="product-card__content">
                        <h2 class="product-name">${product.name}</h2>
                        <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                        <p class="product-installments">${product.parcelamento[0]} x R$ ${product.parcelamento[1]
                .toFixed(2)
                .replace('.', ',')}
                        </p>
                        <button class="buy-button">Comprar</button>
                    </figcaption>
                </figure>
            `
            container.appendChild(productElement)
        })
    }
}

function applyFilters() {
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(
        input => (input as HTMLInputElement).value,
    )
    const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(
        input => (input as HTMLInputElement).value,
    )
    const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(
        input => (input as HTMLInputElement).value,
    )

    const filteredProducts: Product[] = currentProducts.filter(product => {
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

    renderProducts(filteredProducts)
}

function setupFilterListeners() {
    const colorCheckboxes = Array.from(document.querySelectorAll('input[name="color"]'))
    const sizeCheckboxes = Array.from(document.querySelectorAll('input[name="size"]'))
    const priceCheckboxes = Array.from(document.querySelectorAll('input[name="price"]'))

    const allCheckboxes = [...colorCheckboxes, ...sizeCheckboxes, ...priceCheckboxes]

    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters)
    })
}

function showMoreProducts() {
    console.log('showMoreProducts')
    const totalDisplayed = displayedProducts.length
    const nextProducts = currentProducts.slice(totalDisplayed, totalDisplayed + productsPerPage)
    displayedProducts.push(...nextProducts)
    renderProducts(displayedProducts)
}

const productsPerPage = 9
let currentProducts: Product[] = []
let displayedProducts: Product[] = []

async function main() {
    console.log(serverUrl)

    // funções para lidar com cliques nos botões de filtro
    const toggle_filter_btn = document.querySelectorAll('.filter-btn')
    const filter_container = document.getElementById('filter')
    const apply_filter = document.getElementById('apply-filter')

    if (toggle_filter_btn.length > 0 && filter_container && apply_filter) {
        toggle_filter_btn.forEach(btn => {
            btn.addEventListener('click', () => {
                filter_container.classList.toggle('open')
            })
        })

        apply_filter.addEventListener('click', () => {
            filter_container.classList.remove('open')
        })
    }

    const colors_btn = document.getElementById('colors-btn')
    const filter_colors = document.querySelector('.filter-colors')
    const sizes_btn = document.getElementById('sizes-btn')
    const filter_sizes = document.querySelector('.filter-sizes')
    const prices_btn = document.getElementById('prices-btn')
    const filter_prices = document.querySelector('.filter-prices')

    if (colors_btn && sizes_btn && prices_btn) {
        colors_btn.addEventListener('click', () => {
            if (filter_colors) {
                filter_colors.classList.toggle('open')
            }
        })

        sizes_btn.addEventListener('click', () => {
            if (filter_sizes) {
                filter_sizes.classList.toggle('open')
            }
        })

        prices_btn.addEventListener('click', () => {
            if (filter_prices) {
                filter_prices.classList.toggle('open')
            }
        })
    }

    const toggle_sort_btn = document.querySelectorAll('.sort-btn')
    const sort_container = document.querySelector('#sort')

    if (toggle_sort_btn.length > 0 && sort_container) {
        toggle_sort_btn.forEach(btn => {
            btn.addEventListener('click', () => {
                sort_container.classList.toggle('open')
            })
        })
    }

    // daqui pra baixo
    const products = await fetchProducts()
    const validProducts = products.filter(isProduct)
    currentProducts = products.filter(isProduct)

    renderProducts(currentProducts.slice(0, productsPerPage))

    const { colors, sizes } = extractFilters(validProducts)

    renderFilters(colors, sizes)

    setupFilterListeners()

    const loadMoreButton = document.getElementById('load-more')

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', showMoreProducts)
    }
}

document.addEventListener('DOMContentLoaded', main)
