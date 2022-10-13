import { defineConfig } from 'cypress';
import { resetDB } from '__tests__/__mocks__/utils';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                'db:reset': async () => await resetDB(),
            });
        },
    },
    projectId: 'jnyjfu',
});
