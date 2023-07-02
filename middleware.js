export { default } from "next-auth/middleware";
// export const config = {
//   // matcher: ["/profile"],
//   matcher: ["/((?!api|login).*)"],
// };
// export { default } from "next-auth/middleware";
// export const config = {
//   matcher: ["/((?!api|login|^$).*)"],
// };

export const config = { matcher: ["/(dashboard|profile)"] };
