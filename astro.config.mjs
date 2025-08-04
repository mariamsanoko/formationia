import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import staticAdapter from '@astrojs/static';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  adapter: staticAdapter(),
  site: 'https://mariamsanoko.github.io/formationia',
  base: '/formationia/',
  output: 'static',
});
