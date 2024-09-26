export default function renderFilters(colors: string[], sizes: string[]) {
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
