import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from '@/pages/components/Layout'
import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <LoginModal />
      <RegisterModal />
      <Toaster/>
    </SessionProvider>
  );
}
