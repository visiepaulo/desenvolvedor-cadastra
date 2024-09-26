export function addToCart(productId: string): void {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]')

    // Encontrar o produto no DOM usando o ID
    const productElement = document.getElementById(productId) as HTMLElement

    if (!productElement) {
        console.error(`Produto com ID ${productId} não encontrado.`)
        return
    }

    const productImage = productElement.querySelector('.product-card__image') as HTMLImageElement
    const productName = (productElement.querySelector('.product-name') as HTMLElement)?.innerText || ''
    const productPrice =
        (productElement.querySelector('.product-price') as HTMLElement)?.innerText
            .replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.') || '0'

    const product: CartItem = {
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1,
        image: productImage.src,
    }

    // Verificar se o produto já está no carrinho
    const existingProduct = cart.find(item => item.id === product.id)
    if (existingProduct) {
        existingProduct.quantity += 1
    } else {
        cart.push(product)
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    document.querySelector('.cart')?.classList.add('open')
    document.querySelector('.mask')?.classList.add('active')

    updateCartDisplay(cart)
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay(cart: CartItem[]): void {
    const cartContainer = document.getElementById('product-list-in-cart')
    if (!cartContainer) return

    // Limpar conteúdo anterior
    cartContainer.innerHTML = ''

    // Renderizar cada produto no carrinho
    cart.forEach(item => {
        const productElement = document.createElement('div')
        productElement.classList.add('cart-item')
        productElement.innerHTML = `
            <figure>
                <img src="${item.image}" alt="${item.name}" />
                <figcaption>
                    <h3>${item.name}</h3>
                    <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    <p>Quantidade: ${item.quantity}</p>
                </figcaption>
            </figure>
        `
        cartContainer.appendChild(productElement)
    })
}
