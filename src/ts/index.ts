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
                <input type="checkbox" id="color-${color}" name="color" value="${color}">
                <label for="color-${color}">${color}</label>
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
                <label for="size-${size}">${size}</label>
            `
            sizesContainer.appendChild(sizeElement)
        })
    }
}

function renderProducts(products: Product[]) {
    const container = document.getElementById('products')
    if (container) {
        products.forEach(product => {
            const productElement = document.createElement('a')
            productElement.className = 'product-card'
            productElement.href = '#'
            productElement.innerHTML = `
              <figure class="product-card__figure">
                  <img class="product-card__image" src="${product.image}" alt="${product.name}" />
                  <figcaption class="product-card__content">
                      <h2 class="product-name">${product.name}</h2>
                      <p class="product-price">R$ ${product.price}</p>
                      <p class="product-installments">${product.parcelamento.join('x')}</p>
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

    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:5000/products')
            const data = await response.json()

            const validProducts: Product[] = data.filter(isProduct)

            renderProducts(validProducts)

            // Extraindo filtros
            const { colors, sizes } = extractFilters(validProducts)

            // Renderizando filtros
            renderFilters(colors, sizes)
        } catch (error) {
            console.error('Erro ao buscar produtos:', error)
        }
    }

    fetchProducts()
}

document.addEventListener('DOMContentLoaded', main)
