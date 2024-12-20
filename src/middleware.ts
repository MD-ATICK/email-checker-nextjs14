import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { authRoutes, default_login_redirect } from "./routes";

const { auth } = NextAuth(authConfig)

// middleware is unlocked for matcher route. 
// generally middleware is used for set access in routes.

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = req.auth
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isUserRoute = nextUrl.pathname.includes("user")
    const isAdminRoute = nextUrl.pathname.includes("admin")

    if (!isLoggedIn) {
        if (isUserRoute || isAdminRoute) {
            return Response.redirect(new URL('/login', nextUrl))
        }
    }
    
    if (isLoggedIn) {
        if (isAuthRoute) {
            return Response.redirect(new URL(default_login_redirect, nextUrl))
        }
    }

})


export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}