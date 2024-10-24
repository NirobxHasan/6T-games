import Footer from './common/Footer';
import Header from './common/Header';

const Layout = ({ children, categories, setSearchresult }: Props) => {
    return (
        <div className="min-h-screen flex flex-col justify-between ">
            <Header categories={categories} setSearchresult={setSearchresult} />
            <main>{children}</main>

            <div className="static bottom-0">
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
type Props = {
    children: JSX.Element;
    categories: Category[];
    setSearchresult: any;
};
