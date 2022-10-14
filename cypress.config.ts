import { defineConfig } from 'cypress';
import { configurePlugin } from 'cypress-mongodb';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(on, config) {
            configurePlugin(on);
        },
    },
    env: {
        mongodb: {
            collection: 'users',
            database: 'myFirstDatabase',
            // eslint-disable-next-line max-len
            uri: 'mongodb+srv://vercel-admin-user:9I3rRonPu1jbybL6@cluster0.hxhkhh8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        },
        TEST_USER_EMAIL: 'test@test.test',
        TEST_USER_PASSWORD: '12345',
    },
    projectId: 'jnyjfu',
});
