import {ref, computed} from 'vue'
import Navbar from './components/ui/navbar.js'
import Footer from './components/ui/footer.js'

export default {
    components: {
        Navbar,
        Footer
    },
    setup() {
        const count = ref(0)

        return { count }
    },
    template: /*html*/`
        <div id="body">
            <Navbar />
            <Footer />
        </div>
    `
}