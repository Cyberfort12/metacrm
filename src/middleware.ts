import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pipeline/:path*",
    "/contacts/:path*",
    "/tasks/:path*",
  ],
};