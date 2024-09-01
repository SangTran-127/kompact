// export function Static<T extends new (...args: any[]) => any>(ctr: T): T {
//   return class extends ctr {
//     constructor(...args: any[]) {
//       throw new Error('Cannot create static class')
//     }
//   }
// }
