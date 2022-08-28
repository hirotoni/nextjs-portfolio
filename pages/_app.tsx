import { AppProps } from "../node_modules/next/app";
import "../styles/global.css";
import "prismjs/themes/prism.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
