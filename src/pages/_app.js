import "@/styles/styles.css";
import "@/styles/button.css";
import "@/styles/PastOrder.css";
import { AppProps } from "next/app";
import { wrapper } from "../redux/store/index";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { RouteGuard } from "@/components/RouteGuard";
function MyApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </PersistGate>
  );
}
export default wrapper.withRedux(MyApp);
// import { Provider } from "react-redux";
// import { wrapper } from "../redux/store";
// // import '@/styles/globals.css'
// import "@/styles/styles.css";
// export default function App({ Component, ...rest }) {
//   const { store, props } = wrapper.useWrappedStore(rest);
//   const { pageProps } = props;
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }
