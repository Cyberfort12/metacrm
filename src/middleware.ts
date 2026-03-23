export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pipeline/:path*",
    "/contacts/:path*",
    "/tasks/:path*",
  ],
};
