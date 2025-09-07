import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkAuth } from 'features/user';
import { Navigate } from 'react-router-dom';
import HomePage from 'containers/HomePage';
import DashboardPage from 'containers/DashboardPage';
import LoginPage from 'containers/LoginPage';
import UploadAndDisplayImage from 'containers/Annotate/UploadAndDisplayImage';
import UploadAndDisplayImageA from 'containers/Annotate/UploadAndDisplayImageA';
import Patient1 from 'containers/Patient/Patient1';
import Account1 from 'containers/Account/Account1';
import ResetPassword from 'containers/ResetPassword';
import ResetPasswordConfirm from 'containers/ResetPasswordConfirm';
import Profile from 'containers/Profile';
import PatientDetails1 from 'containers/Patient/PatientDetails1';
import Model from 'containers/Model/Model';
import UploadImage from 'containers/AIModels/UploadImage';
import UploadImageS from 'containers/AIModels/UploadImageS';
import NoMatch from 'components/NoMatch';


const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
	}, []);

	return (
		<div className='App'>
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='login' element={<LoginPage />} />
				<Route path="reset-password" element={<ResetPassword />} />
            	<Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
				<Route path='dashboard' element={<DashboardPage />}>
					<Route index element={<Navigate to="profile" replace />} />
					<Route path="profile" element={<Profile />} />
					<Route path="patients" element={<Patient1 />} />
					<Route path='patients/:pk' element={<PatientDetails1 />} />
					<Route path="models" element={<Model />} />
					<Route path="models/segment" element={<UploadImageS />} />
					<Route path="models/generate" element={<UploadImage />} />
					<Route path="annotate" element={<UploadAndDisplayImageA />} />
					<Route path="accounts" element={<Account1 />} />
				</Route>
				<Route path="annotate" element={<UploadAndDisplayImage />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</Router>
		</div>
	);
};

export default App;
