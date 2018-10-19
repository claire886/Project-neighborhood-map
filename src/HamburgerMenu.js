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

	function enterHamburgerMenu(e) {
console.log('---press enter key---', e.charCode)		
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
