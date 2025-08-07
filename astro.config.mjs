import { defineConfig } from 'astro/config';
//import github from '@astrojs/github';

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://mariamsanoko.github.io/formationia/',
  base: '/formationia/'
});