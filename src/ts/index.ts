import { Product } from './models/Product'

const serverUrl = 'http://localhost:5000'

function isProduct(obj: any): obj is Product {
    return (
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.price === 'number' &&
        Array.isArray(obj.parcelamento) &&
        typeof obj.color === 'string' &&
        typeof obj.image === 'string' &&
        Array.isArray(obj.size) &&
        typeof obj.date === 'string'
    )
}

function extractFilters(products: Product[]) {
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

function renderFilters(colors: string[], sizes: string[]) {
    const colorsContainer = document.getElementById('colors')
    const sizesContainer = document.getElementById('sizes')

    if (colorsContainer) {
        colors.forEach(color => {
            const colorElement = document.createElement('div')
            colorElement.className = 'filter-item'
            colorElement.innerHTML = `
                <label for="color-${color}">
                    <input type="checkbox" id="color-${color}" name="color" value="${color}">
                    <span class="checkmark"></span>
                        ${color}
                </label>
            `
            colorsContainer.appendChild(colorElement)
        })
    }

    if (sizesContainer) {
        sizes.forEach(size => {
            const sizeElement = document.createElement('div')
            sizeElement.className = 'filter-item'
            sizeElement.innerHTML = `
                <input type="checkbox" id="size-${size}" name="size" value="${size}">
                <label for="size-${size}">
                    ${size}
                </label>
            `
            sizesContainer.appendChild(sizeElement)
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

function renderProducts(products: Product[]) {
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

function main() {
    console.log(serverUrl)

    // funções para lidar com cliques nos botões de filtro
    const filter_btn = document.getElementById('filter-btn')
    const filter = document.getElementById('filter')
    const close_filter = document.getElementById('close-filter')
    const apply_filter = document.getElementById('apply-filter')

    if (filter_btn && filter && close_filter && apply_filter) {
        filter_btn.addEventListener('click', () => {
            filter.classList.add('open')
        })

        close_filter.addEventListener('click', () => {
            filter.classList.remove('open')
        })

        apply_filter.addEventListener('click', () => {
            filter.classList.remove('open')
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
            filter_colors.classList.toggle('open')
        })

        sizes_btn.addEventListener('click', () => {
            filter_sizes.classList.toggle('open')
        })

        prices_btn.addEventListener('click', () => {
            filter_prices.classList.toggle('open')
        })
    }

    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:5000/products')
            const data = await response.json()

            const validProducts = data.filter(isProduct)
            currentProducts = data.filter(isProduct)
            console.log('Produtos:', validProducts)
            renderProducts(currentProducts.slice(0, productsPerPage))

            const { colors, sizes } = extractFilters(validProducts)

            renderFilters(colors, sizes)

            setupFilterListeners()

            const loadMoreButton = document.getElementById('load-more')

            if (loadMoreButton) {
                loadMoreButton.addEventListener('click', showMoreProducts)
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error)
        }
    }

    fetchProducts()
}

document.addEventListener('DOMContentLoaded', main)
