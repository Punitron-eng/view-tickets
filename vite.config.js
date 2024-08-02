import { fileURLToPath, URL } from 'url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
    // eslint-disable-next-line no-undef
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            vue({
                script: {
                    defineModel: true,
                },
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)), // Alias for the 'images' folder
                '@darkImages': fileURLToPath(new URL('./src/assets/images/dark-mode', import.meta.url)), // Alias for the 'dark-mode' folder within 'images'
            },
        },
        define: {
            'process.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
        build: {
            sourcemap: false, // Disable source maps for production
        },
        base: process.env.NODE_ENV === 'production' ? '/dt-v5' : '/', // Added a trailing slash for the publicPath in production
    };
});
