import { Helmet } from 'react-helmet';
import Navbar from 'components/NavBar';
import Footer from 'components/Footer';

const Layout = ({ title, content, children }) => (
	<>
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={content} />
		</Helmet>
		<Navbar />
		<div>{children}</div>
		<Footer />
	</>
);

export default Layout;
