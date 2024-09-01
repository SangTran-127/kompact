// export function Version(version: string | string[]) {
//   if (Array.isArray(version)) {
//     version = [...new Set(version)];
//   }
//   return (
//     target: any,
//     key: string | symbol,
//     descriptor: PropertyDescriptor
//   ) => {
//     Reflect.defineMetadata("version", version, target);
//   };
// }
