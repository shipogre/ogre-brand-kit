import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command, mode }) => {
  // Demo mode for development
  if (mode === 'demo' || command === 'serve') {
    return {
      root: 'demo',
      plugins: [react(), tailwindcss()],
      server: {
        port: 5174,
        open: true,
      },
    };
  }

  // Library build mode
  return {
    plugins: [
      dts({
        include: ['src'],
        outDir: 'dist',
        rollupTypes: false,
      }),
    ],
    build: {
      lib: {
        entry: {
          index: resolve(__dirname, 'src/index.ts'),
          tokens: resolve(__dirname, 'src/tokens.ts'),
          'tailwind.preset': resolve(__dirname, 'src/tailwind.preset.ts'),
          'components/index': resolve(__dirname, 'src/components/index.ts'),
          'plugins/components': resolve(__dirname, 'src/plugins/components.ts'),
        },
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime', 'react-router-dom', 'tailwindcss', 'lucide-react'],
        output: {
          preserveModules: false,
          exports: 'named',
        },
      },
      cssCodeSplit: false,
      sourcemap: true,
      minify: false,
    },
  };
});
