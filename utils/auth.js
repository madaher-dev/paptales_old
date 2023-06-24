import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
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
        console.log("credentials", credentials);
        // write a post fetch request to the api
        try {
          const res = await fetch(`http://localhost:3000/api/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email }),
          }); // fetch the user from the api
          if (!res.ok) {
            return null;
          }
          const { user } = await res.json(); // convert the response to json

          if (!user.password) user.password = "";
          if (!user || !(await compare(credentials.password, user.password))) {
            return null;
          }
          // console.log("user", user);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            randomKey: "Hey cool",
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
        };
      }
      return token;
    },
  },
};
