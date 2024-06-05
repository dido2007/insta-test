import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import config from "@/config";
import connectMongo from "./mongo";

export const authOptions = {
  // Set any random key in .env.local
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // GoogleProvider({
    //   // Follow the "Login with Google" tutorial to get your credentials
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    //   async profile(profile) {
    //     console.log("google profile", profile )
    //     return {
    //       id: profile.sub,
    //       name: profile.given_name ? profile.given_name : profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //       role: profile.role || "model",
    //       createdAt: new Date(),
    //     };
    //   },
    // }),
    InstagramProvider({
      clientId: process.env.AUTH_INSTAGRAM_ID,
      clientSecret: process.env.AUTH_INSTAGRAM_SECRET,
      // async profile(profile) {
      //   console.log("instagram profile", profile )
      //   return {
      //     id: profile.id,
      //     name: profile.username,
      //     email: profile.email,
      //     image: profile.profile_picture,
      //     role: profile.role || "model",
      //     createdAt: new Date(),
      //   };
      // }, 
    }),
    // Follow the "Login with Email" tutorial to set up your email server
    // Requires a MongoDB database. Set MONOGODB_URI env variable.
    ...(connectMongo
      ? [
          EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: config.mailgun.fromNoReply,
          }),
        ]
      : []),
  ],
  // New users will be saved in Database (MongoDB Atlas). Each user (model) has some fields like name, email, image, etc..
  // Requires a MongoDB database. Set MONOGODB_URI env variable.
  // Learn more about the model type: https://next-auth.js.org/v3/adapters/models
  ...(connectMongo && { adapter: MongoDBAdapter(connectMongo) }),

  callbacks: {
    jwt({ token, user }) {
      if(user) token.role = user.role
      return token
    },
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.role = token.role
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    brandColor: config.colors.main,
    // Add you own logo below. Recommended size is rectangle (i.e. 200x50px) and show your logo + name.
    // It will be used in the login flow to display your logo. If you don't add it, it will look faded.
    logo: `https://${config.domainName}/logoAndName.png`,
  },
};
