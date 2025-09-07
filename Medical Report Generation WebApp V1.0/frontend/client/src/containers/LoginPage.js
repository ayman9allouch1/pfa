import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { resetRegistered, login, clearError } from 'features/user';
import Layout from 'components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


const LoginPage = () => {

	const ShowEye = <FontAwesomeIcon icon={faEye} />
  	const HideEye = <FontAwesomeIcon icon={faEyeSlash} />

	const [passwordType, setPasswordType] = useState('password')

	const togglePassword = () => {
		if(passwordType==="password"){
		  setPasswordType("text")
		  return;
		}
		setPasswordType("password")
	}
	

	const dispatch = useDispatch();
	const { loading, isAuthenticated, registered, error } = useSelector(
		state => state.user
	);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (registered) dispatch(resetRegistered());
	}, [registered]);

	const { email, password } = formData;

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		try{
		dispatch(login({ email, password }));
		}catch(e) {
			console.log('ERROR!')
		}
	};

	useEffect(() => {
		dispatch(clearError()); 
		return () => {
		  dispatch(clearError()); 
		};
	  }, [dispatch]);

	if (isAuthenticated) return <Navigate to='/dashboard' />;

	return (
		<Layout title='PFE | Login' content='Login page'>
			<div className="container mt-5">
			<h1>Log into your Account</h1>
			<form className='mt-5' onSubmit={onSubmit} style={{width:'50%', justifyContent: 'center', alignItems: 'center', display: 'inline-block'}}>
				<div className='form-group'>
					<label className='form-label' htmlFor='email'>
						Email
					</label>
					<input
						className='form-control'
						type='email'
						name='email'
						onChange={onChange}
						value={email}
						placeholder='Email address'
						required
					/>
				</div>
				<div className='form-group mt-3'>
					<label className='form-label' htmlFor='password'>
						Password
					</label>
					<input
						className='form-control'
						type={passwordType}
						name='password'
						onChange={onChange}
						value={password}
						placeholder='Password'
						required
					/>
					<button className="button-password" type="button" onClick={togglePassword}>
						{ passwordType === "password"? 
						<i style={{padding:'4px'}}>{HideEye}</i> 
						: <i style={{padding:'5px'}}>{ShowEye}</i>} 
					</button>
				</div>
				<br />	
				{error && (
					<div className="alert alert-danger">{error}: Invalid credentials were provided</div>
				)}
				{loading ? (
					<div className='spinner-border text-primary' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				) : (
					<button className='btn btn-primary mt-4'>Login</button>
				)}
			</form>
			<p className="container mt-5">
				<Link to="/reset-password">Forgotten password?</Link>
			</p> 
			</div>
		</Layout>
	);
};

export default LoginPage;
