import NextAuth from "next-auth"
import { User } from '../app/interfaces/user';

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface User {
        id: string,
        email: string,
        username: string,
        first_name: string | null,
        last_name: string | null,
        description: string | null,
        roles: string[] | string,
        token: string | null,
    }

    interface Session {
        user: {
            id: string,
            email: string,
            username: string,
            first_name: string | null,
            last_name: string | null,
            description: string | null,
            roles: string[] | string,
            token: string | null,
        },
    }


}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        user: {
            id: string,
            email: string,
            username: string,
            first_name: string | null,
            last_name: string | null,
            description: string | null,
            roles: string[] | string,
            token: string | null,
        },
    }
}