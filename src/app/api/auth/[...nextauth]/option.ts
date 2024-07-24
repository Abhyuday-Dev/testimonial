import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/User';
import Google from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
            const user = await UserModel.findOne({
              $or: [{ email: credentials.email }],
            });
  
            if (!user) {
              throw new Error("No user found with this email");
            }
  
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
  
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Incorrect password");
            }
          } catch (err: any) {
            throw new Error(err);
          }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
        if (account?.provider === "google") {
          try {
            const { email, name, id } = user;
            await dbConnect();
            const userAlreadyExits = await UserModel.findOne({ email });
  
            if (!userAlreadyExits) {
              await UserModel.create({
                email: email,
                username: name,
                googleId: id,
              });
            }
            return true;
          } catch (err) {
            return false;
          }
        }
        return true;
      },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); 
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};