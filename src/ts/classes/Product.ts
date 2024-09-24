export class Product {
    id: string
    name: string
    price: number
    parcelamento: Array<number>
    color: string
    image: string
    size: Array<string>
    date: string

    constructor(data: any) {
        this.id = data.id
        this.name = data.name
        this.price = data.price
        this.parcelamento = data.parcelamento || []
        this.color = data.color
        this.image = data.image
        this.size = data.size || []
        this.date = data.date
    }

    // Método exemplo: formata o preço
    formatPrice(): string {
        return `R$ ${this.price.toFixed(2).replace('.', ',')}`
    }

    // Método exemplo: formata o parcelamento
    formatParcelamento(): string {
        return this.parcelamento.length
            ? `${this.parcelamento.length}x de R$ ${(this.price / this.parcelamento.length).toFixed(2)}`
            : 'Sem parcelamento'
    }
}
