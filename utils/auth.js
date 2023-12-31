import CredentialsProvider from "next-auth/providers/credentials";
import { hash } from "bcryptjs";
import User from "@/models/userModel";

export const authOptions = {
  // session: {
  //   strategy: "jwt",
  //   maxAge: 30 * 24 * 60 * 60, // The number of seconds that a session is valid for.
  //   updateAge: 24 * 60 * 60, // The number of seconds each time a session is accessed that the expiration is extended by.
  //   jwt: {
  //     signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  //   },
  //   secret: process.env.SESSION_SECRET,
  //   secureCookie: process.env.NODE_ENV === "production", // Use secure cookies in production, but allow for testing in development.
  // },

  // sessionToken: {
  //   name: `next-auth.session-token`,
  //   options: {
  //     httpOnly: true,
  //     sameSite: "none",
  //     path: "/",
  //     domain: process.env.NEXT_PUBLIC_URL,
  //     secure: true,
  //   },
  // },
  // callbackUrl: process.env.NEXT_PUBLIC_URL,

  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // const user = { id: "1", name: "Admin", email: "admin@admin.com" };
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        // const URL = process.env.NEXT_PUBLIC_URL;
        // write a post fetch request to the api
        try {
          await connectToDatabase();
          const hashed_password = await hash(credentials.password, 12);
          const user = await User.findOne({ email, password: hashed_password });

          // const res = await fetch(`${URL}/api/user/login`, {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({ email: credentials.email }),
          // }); // fetch the user from the api
          // if (!res.ok) {
          //   return null;
          // }
          // const { user } = await res.json(); // convert the response to json
          // console.log("user", user);
          // let callback = process.env.NEXTAUTH_URL;
          // console.log("callback", callback);

          // if (!user?.password) user.password = "";
          // if (!user || !(await compare(credentials.password, user.password))) {
          if (!user) {
            // console.log(
            //   "password",
            //   credentials.password,
            //   "user.password",
            //   user.password,
            //   "compare",
            //   await compare(credentials.password, user.password)
            // );
            // console.log("no user or password");
            return null;
          }
          console.log("user", user);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            randomKey: "Hey cool",
            players: user.players,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
          players: token.players,
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        return {
          ...token,
          id: user.id,
          randomKey: user.randomKey,
          players: user.players,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/dashboard/new", // If set, new users will be directed here on first sign in
  },
};
