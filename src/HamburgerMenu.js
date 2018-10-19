import React from 'react'

const HamburgerMenu = () => {
	function sideBarToggle() {
		const elSideBar = document.querySelector('.sideBar');
		if (elSideBar.style.display === 'none') {
			elSideBar.style.display = 'block';
		} else {
			elSideBar.style.display = 'none';
		}
	}

	return (
		<div id='hamburger-menu' onClick={() => sideBarToggle()} >
			<div className='hamburger-bar'></div>
			<div className='hamburger-bar'></div>
			<div className='hamburger-bar'></div>
		</div>
	)
}

export default HamburgerMenu
