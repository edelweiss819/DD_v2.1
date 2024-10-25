import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
                                plugins: [
                                    react(),
                                    svgr({
                                             svgrOptions: {
                                                 exportType: 'default',
                                                 ref: true,
                                                 svgo: false,
                                                 titleProp: true,
                                                 typescript: true,
                                             },
                                             include: '**/*.svg',
                                         }),

                                ],
                                server: {
                                    watch: {usePolling: true}
                                },
                                resolve: {
                                    alias: {
                                        '@styles': path.resolve(__dirname, 'src/styles')
                                    }
                                },

                            });
