import { Product } from '../models/Product'

export default function isProduct(obj: any): obj is Product {
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
