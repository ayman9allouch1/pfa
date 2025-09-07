import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Layout from 'components/Layout';
import UserNav from './UserNav';
import { BrowserRouter as Router, Outlet  } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";


const DashboardPage = () => {
	const { isAuthenticated, user, loading } = useSelector(state => state.user);


	const [accessToken, setAccessToken] = useState(null);

	const [me, setMe] = useState({})
	useEffect(() => {
		setMe(user)
	})

	
    useEffect(() => {
        async function fetchAccessToken() {
			try{
            const response = await axios.get("http://localhost:8000/api/get-access-token", {withCredentials:true});
            setAccessToken(response.data.access);
			} catch (error) {
				console.error("Error fetching access token:", error);
			}
        }
        fetchAccessToken();
    }, [accessToken]);


	if (!isAuthenticated && !loading && user === null)
		return <Navigate to='/login' />;

	
	return (
		<Layout title='PFE | Dashboard' content='Dashboard page'>
			{loading || user === null ? (
				<>
				<br />
				<div className='spinner-border text-primary' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
				</>
			) : (
				<>
					<UserNav user={user} access={accessToken} />

					<Outlet context={accessToken}/>
				</>
			)}
		</Layout>
	);
};

export default DashboardPage;
