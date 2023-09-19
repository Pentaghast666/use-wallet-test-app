import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // https://github.com/vitejs/vite/discussions/5912#discussioncomment-2908994
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    // global: {},
    _global: {},
  },
  // compilerOptions: {
  //   skipLibCheck: true,
  // },
  resolve: {
    alias: {
      'algorand-qrcode': './node_modules/algorand-qrcode', //path.resolve(__dirname, 'node_modules/algorand-qrcode'),
    }
  },
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'),
  //       nested: resolve(__dirname, 'nested/index.html'),
  //     },
  //   },
  // },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:3100',
        changeOrigin: true,
        secure: false,      
        ws: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  }
})

