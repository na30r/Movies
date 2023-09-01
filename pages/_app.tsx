import { AppProps } from "next/app"; // Import AppProps from Next.js
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as ReduxProvider } from "react-redux";
import store from "../src/redux/configureStore";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  // Use AppProps for type annotation
  return (
    // <Component {...pageProps} />

    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <ThemeProvider> */}
        <Component {...pageProps} />
        {/* </ThemeProvider> */}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default MyApp;
