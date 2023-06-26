import '@/assets/styles/global.scss';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export const App = () => {
    return (
        <>
            <Header />
            <main>
                <p> Add content here </p>
            </main>
            <Footer />
        </>
    );
};
