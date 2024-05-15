import { PrismaAdapter } from '@auth/prisma-adapter'
import { getUserById } from './data/users'
import authConfig from '@/auth.config'
import NextAuth from 'next-auth'
import db from '@/libs/db'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: '/admin/login'
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role

      return token
    }
  },
  adapter: PrismaAdapter(db),

  session: { strategy: 'jwt' },
  ...authConfig
})