import { withAuth } from "next-auth/middleware";

export { withAuth } from "next-auth/middleware";
// export { default } from "next-auth/middleware";
// export const config = {
//   // matcher: ["/profile"],
//   matcher: ["/((?!api|login).*)"],
// };
// export { default } from "next-auth/middleware";
// export const config = {
//   matcher: ["/((?!api|login|^$).*)"],
// };
export default withAuth(
  function middleware(req) {
    console.log("middleware");
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
);
export const config = { matcher: ["/(dashboard|profile)"] };
