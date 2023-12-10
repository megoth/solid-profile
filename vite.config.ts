import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(() => {
    return {
        plugins: [
            react(),
            mdx(),
        ],
    };
})
