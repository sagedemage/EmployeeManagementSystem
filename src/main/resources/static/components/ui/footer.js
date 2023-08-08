/*
 * Footer UI
 */

export default {
    setup() {
        const current_year = new Date().getFullYear()
        return { current_year }
    },
    template: /*html*/`
        <footer id="copyright">
            <p> &copy; {{current_year}} Salmaan Saeed </p>
        </footer>
    `
}