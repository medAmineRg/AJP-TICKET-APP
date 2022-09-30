import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../app/store";
import Layout from "../component/layout/layout";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  );
}

export default MyApp;
