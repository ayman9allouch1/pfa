import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'features/user';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect , Fragment } from "react";


function NavBar() {

	const Moon = <FontAwesomeIcon icon={faMoon} />
	const Sun = <FontAwesomeIcon icon={faSun} />

	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	useEffect(() => {
		localStorage.setItem('theme', theme);
		document.body.className = theme;
	}, [theme]);

	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector(state => state.user);

	const authLinks = (
		<Fragment>
			<Link className='nav-link' to='/dashboard'>
				Dashboard
			</Link>
			<a className='nav-link' href='#!' onClick={() => dispatch(logout())}>
				Logout
			</a>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Link className='nav-link' to='/annotate'>
				Annotate
			</Link>
			<Link className='nav-link' to='/login'>
				Login
			</Link>
		</Fragment>
	);

	return (
		<div className={`${theme}`}>
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand >
					<Link className='navbar-brand' to={"/"}> Annotate </Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
          		<Navbar.Collapse id="responsive-navbar-nav">
				  	<Nav className="me-auto">
						<Link className='nav-link' to="/">Home</Link>
						<Link className='nav-link' to="/pricing">Pricing</Link>
						<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
							<NavDropdown.Item to="/action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item to="/action/3.2">
							Another action
							</NavDropdown.Item>
							<NavDropdown.Item to="/action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item to="/action/3.4">
							Separated link
							</NavDropdown.Item>
						</NavDropdown>
            		</Nav>
					<Nav>
						<Nav.Item>
							<button id='mode' title={theme === 'light' ? 'Dark mode' : 'Light mode'} onClick={toggleTheme}>
							{ theme === 'light' ? 
								<i style={{padding:'5px'}}>{Sun}</i> 
								: <i style={{padding:'5px'}}>{Moon}</i> 
							}
							</button> 
						</Nav.Item>
						{isAuthenticated ? authLinks : guestLinks}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		</div>
	);
};

export default NavBar;
