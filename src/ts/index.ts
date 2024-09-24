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
        } catch (error) {
            console.error('Erro ao buscar produtos:', error)
        }
    }

    fetchProducts()
}

document.addEventListener('DOMContentLoaded', main)
