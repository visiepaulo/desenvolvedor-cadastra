export default async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/products')
        const data = await response.json()

        return data
    } catch (error) {
        console.error('Erro ao buscar produtos:', error)
    }
}
