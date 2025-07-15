import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            ssr: 'resources/js/ssr.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    optimizeDeps: {
        include: [
            '@codemirror/state',
            '@codemirror/view',
            '@codemirror/commands',
            '@codemirror/history',
            '@codemirror/language',
            '@codemirror/lang-javascript',
            '@codemirror/theme-one-dark',
        ],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('axios')) return 'vendor-axios';
                        if (id.includes('lodash')) return 'vendor-lodash';
                        return 'vendor';
                    }
                },
            },
        },
        chunkSizeWarningLimit: 1500, // Увеличиваем лимит до 1500 кБ
    },
});
