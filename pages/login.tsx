import React from "react";
import AuthLayout from '../app/components/authLayout/authLayout';
import { getSession, getProviders, getCsrfToken } from "next-auth/react";
import LoginComponent from "app/components/auth/loginComponent";

export default function Login() {
  return (
    <AuthLayout>
      <LoginComponent />
    </AuthLayout>
  );
}


Login.getInitialProps = async (context: any) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.user.token) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: session,
    providers: await getProviders(),
    csrfToken: await getCsrfToken(context),
  };
};