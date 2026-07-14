import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Fallback to empty string if BASE_PATH is undefined
const basePath = (process.argv.includes('dev') ? '' : (process.env.BASE_PATH ?? '')) as `/${string}` | '';

export default defineConfig({
    plugins: [
        sveltekit({
            compilerOptions: {
                // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true
            },
            // Flat SvelteKit configurations (KitConfig)
            adapter: adapter({
                pages: 'build',
                assets: 'build',
                fallback: undefined,
                precompress: false,
                strict: true
            }),
            paths: {
                base: basePath
            },
            prerender: {
                handleHttpError: ({ path, message }) => {
                    // Ignore the false-positive 404 error when SvelteKit crawls the root domain
                    if (path === '/') {
                        return;
                    }
                    throw new Error(message);
                }
            }
        })
    ]
});