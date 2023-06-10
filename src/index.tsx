import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider, theme } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

(window as any).api = api;
const client = new QueryClient();

root.render(
  <React.StrictMode>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, token: { borderRadius: 1 } }}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);

reportWebVitals();
