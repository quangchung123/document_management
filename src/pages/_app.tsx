import '@/styles/globals.scss';
import '@/styles/nprogress.css';
import "devextreme/dist/css/dx.light.css";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'reactjs-popup/dist/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import {store} from "@/store/makeStore";
import NProgress from 'nprogress';
import {Router} from "next/router";
import {ToastContainer} from "react-toastify";

export default function App({Component, pageProps}: AppProps) {
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <ToastContainer
                newestOnTop
                position="top-center"
                limit={1}
                autoClose={2000}
                hideProgressBar={true}
            />
        </Provider>
    )
}
