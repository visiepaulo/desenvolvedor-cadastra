import { addToCart } from './addToCart'

export default function setupCartListeners(): void {
    const buyButtons = document.querySelectorAll('.buy-button')

    buyButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault() // Impede a ação padrão do link
            const productId = (button.closest('.product-card') as HTMLElement)?.id // Obtem o ID do produto
            if (productId) {
                addToCart(productId)
            }
        })
    })
}
