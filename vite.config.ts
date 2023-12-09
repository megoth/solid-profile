import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(() => { // {command}
    // if (command === "serve") { //dev config
    //     return {
    //         ...baseConfig,
    //     }
    // }
    return {
        plugins: [
            {enforce: 'pre'},
            react(),
        ],
    };
})
