import Layout from 'components/Layout';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';


const HomePage = () => {
	return (
		<Layout title='PFE | Home' content='Home page'>
			<Carousel>
				<Carousel.Item>
					<img
					className="d-block w-100"
					src={image1}
					alt="First slide"
					/>
					<Carousel.Caption>
					<h3>Artificial Intelligence</h3>
					<p></p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
					className="d-block w-100"
					src={image2}
					alt="Second slide"
					/>

					<Carousel.Caption>
					<h3>Annotate</h3>
					<p></p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
					className="d-block w-100"
					src={image3}
					alt="Third slide"
					/>

					<Carousel.Caption>
					<h3>DICOM</h3>
					<p>
						
					</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
			<div className='container mt-5'>
				<h1 className='mb-5'>Home</h1>
				<p>Welcome!</p>
			</div>

		</Layout>
	);
};

export default HomePage;
