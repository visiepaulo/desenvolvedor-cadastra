import { Product } from '../models/Product'

export default function renderProducts(products: Product[]) {
    const container = document.getElementById('products')
    if (container) {
        container.innerHTML = ''
        products.forEach(product => {
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
