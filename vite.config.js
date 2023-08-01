import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/elite-bank/',
    plugins: [react(), eslint()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
