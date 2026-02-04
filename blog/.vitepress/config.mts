import { defineConfig } from 'vitepress'
import { katex } from '@mdit/plugin-katex'
import { createMermaidPlugin } from './mermaid-plugin'
import footnote from 'markdown-it-footnote'

export default defineConfig({
    title: "Product Picker",
    description: "A Bayesian tool for discovering your true preferences",
    base: '/product_picker/',
    cleanUrls: true,
    markdown: {
        config(md) {
            md.use(katex)
            md.use(createMermaidPlugin())
            md.use(footnote)
        }
    },
    head: [
        ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css' }]
    ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'GitHub', link: 'https://github.com/hugocool/product_picker' }
        ],
        sidebar: [
            {
                text: 'The Story & The Math',
                items: [
                    { text: 'Part 1: The Pendant Problem', link: '/part1-the-pendant-problem' },
                    { text: 'Part 2: TrueSkill Demystified', link: '/part2-trueskill-demystified' },
                    { text: 'Part 3: The Pair Selection Puzzle', link: '/part3-pair-selection-puzzle' }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/hugocool/product_picker' }
        ]
    }
})
