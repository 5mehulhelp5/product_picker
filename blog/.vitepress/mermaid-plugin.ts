import type MarkdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token'

export function createMermaidPlugin() {
    return (md: MarkdownIt) => {
        const defaultFenceRule = md.renderer.rules.fence

        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
            const token = tokens[idx]

            if (token.info === 'mermaid') {
                const content = token.content
                return `<VitepressMermaid code="${encodeURIComponent(content)}" />`
            }

            return defaultFenceRule!(tokens, idx, options, env, self)
        }
    }
}
