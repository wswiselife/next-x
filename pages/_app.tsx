import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from '@/pages/components/Layout'
import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <LoginModal />
      <RegisterModal />
    </>
  );
}
