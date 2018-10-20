import React from 'react'

const HamburgerMenu = () => {
	// Users can click the hamburger menu to make side bar showed or disappeared
	function sideBarToggle() {
		const elSideBar = document.querySelector('.sideBar');
		if (elSideBar.style.display === 'none') {
			elSideBar.style.display = 'block';
		} else {
			elSideBar.style.display = 'none';
		}
	}
	// When hamburger menu is focused, users can press enter key on keyboard to make side bar showed or disappeared. 
	function enterHamburgerMenu(e) {
		if (e.charCode === 13) {
			sideBarToggle()
		}
	}

	return (
		<div id='hamburger-menu' tabIndex='0' aria-label='side bar toggle' role='Switch'
			 onClick={() => sideBarToggle()}
			 onKeyPress={(e) => enterHamburgerMenu(e)}>
			
			<div className='hamburger-bar'></div>
			<div className='hamburger-bar'></div>
			<div className='hamburger-bar'></div>
		</div>
	)
}

export default HamburgerMenu
