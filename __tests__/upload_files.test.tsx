/* eslint-disable max-len */
// import { testApiHandler } from 'next-test-api-route-handler';
// import { expect } from '@jest/globals';

// import uploadFileHandler from '@/pages/api/files/upload';

// // eslint-disable-next-line max-len
// test('POST /api/files/upload updates the user with the specified file', async () => {
//     await testApiHandler({
//         handler: uploadFileHandler,
//         test: async ({ fetch }) => {
//             const res = await fetch({
//                 body: JSON.stringify({
//                     email: 'test@test.test',
//                     image: {
//                         name: 'Mi proyecto.png',
//                         originalName: 'Mi proyecto.png',
//                         size: 25390,
//                         // eslint-disable-next-line max-len
//                         url: 'https://firebasestorage.googleapis.com/v0/b/insta-share-7b2e8.appspot.com/o/images%2FMi%20proyecto.png?alt=media&token=5c850a15-150e-45af-a39a-d2ceb7c95c2e',
//                     },
//                 }),
//                 headers: {
//                     'content-type': 'application/json', // Must use correct content type
//                 },
//                 method: 'POST',
//             });
//             console.log(res);
//             expect(res.status).toBe(200);
//             const json = await res.json();
//             expect(json.message).toEqual('User updated successfully');
//         },
//         url: 'http://localhost:3000/api/files/upload',
//     });
// });

test('should work', () => {});
export {};
