import { CartItem } from '../models/CartItem'

import { updateCartDisplay } from './addToCart'
import { updateTotalAndQuantity } from './addToCart'

export default function loadCartFromLocalStorage(): void {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]')

    if (cart.length > 0) {
        updateCartDisplay(cart)
        updateTotalAndQuantity(cart)
    }
}
