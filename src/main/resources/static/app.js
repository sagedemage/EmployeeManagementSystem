import {ref, computed} from 'vue'

export default {
    setup() {
        const count = ref(0)

        return { count }
    },
    template: /*html*/`
        <div id="body">
        </div>
    `
}