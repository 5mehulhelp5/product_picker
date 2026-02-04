import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VitepressMermaid from './VitepressMermaid.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('VitepressMermaid', VitepressMermaid)
    }
} satisfies Theme
