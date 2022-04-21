import 'rsuite/dist/rsuite.min.css'
import SimpleReactLightbox from 'simple-react-lightbox'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/globals.css'
// import { ThemeProvider } from 'next-themes'

import { AccountContextProvider } from '../contexts/AccountContext'

export default function MyApp({ Component, pageProps }) {
    return (
        <AccountContextProvider>
            <SimpleReactLightbox>
                {/* <ThemeProvider> */}
                <div className="flex flex-col min-h-screen bg-bottom bg-no-repeat bg-bg-color bg-wave">
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </div>
                {/* </ThemeProvider> */}
            </SimpleReactLightbox>
        </AccountContextProvider>
    )
}

