import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-div-container'>
			<div className='left-nav-div'>
				<div className='home-link'>
					<NavLink className="nav-link" exact to="/">
						<h2 className="home-logo" src="/Homelogo.png">Wizlet</h2>
					</NavLink>
				</div>
				{sessionUser && <div className='library'>
					<NavLink className="nav-link" exact to="/library">Library</NavLink>
				</div>}
				<div className='recent-folders'>
					<NavLink className="nav-link" to="/folders/recent">Recent Folders</NavLink>
				</div>
				<div className='recent-sets'>
					<NavLink className="nav-link" to="/sets/recent">Recent Sets</NavLink>
				</div>
			</div>
			{isLoaded && (
				<>
					
					<div className='user-links'>
						
						<ProfileButton user={sessionUser} />
					</div>
				</>
			)}
		</div>
	);
}

export default Navigation;