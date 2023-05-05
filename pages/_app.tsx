import { AppProps } from "../node_modules/next/app";
import "../styles/global.css";
import "prismjs/themes/prism-tomorrow.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
