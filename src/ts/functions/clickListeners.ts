export function clickListeners() {
    const toggle_filter_btn = document.querySelectorAll('.filter-btn')
    const filter_container = document.getElementById('filter')
    const apply_filter = document.getElementById('apply-filter')

    if (toggle_filter_btn.length > 0 && filter_container && apply_filter) {
        toggle_filter_btn.forEach(btn => {
            btn.addEventListener('click', () => {
                filter_container.classList.toggle('open')
            })
        })

        apply_filter.addEventListener('click', () => {
            filter_container.classList.remove('open')
        })
    }

    const colors_btn = document.getElementById('colors-btn')
    const filter_colors = document.querySelector('.filter-colors')
    const sizes_btn = document.getElementById('sizes-btn')
    const filter_sizes = document.querySelector('.filter-sizes')
    const prices_btn = document.getElementById('prices-btn')
    const filter_prices = document.querySelector('.filter-prices')

    if (colors_btn && sizes_btn && prices_btn) {
        colors_btn.addEventListener('click', () => {
            if (filter_colors) {
                filter_colors.classList.toggle('open')
            }
        })

        sizes_btn.addEventListener('click', () => {
            if (filter_sizes) {
                filter_sizes.classList.toggle('open')
            }
        })

        prices_btn.addEventListener('click', () => {
            if (filter_prices) {
                filter_prices.classList.toggle('open')
            }
        })
    }

    const toggle_sort_btn = document.querySelectorAll('.sort-btn')
    const sort_container = document.querySelector('#sort')

    if (toggle_sort_btn.length > 0 && sort_container) {
        toggle_sort_btn.forEach(btn => {
            btn.addEventListener('click', () => {
                sort_container.classList.toggle('open')
            })
        })
    }
}
