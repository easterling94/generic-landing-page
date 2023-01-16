/******************************************
* targorithm.js
* by easterling94
* 
* This file contains all scripts for 
* targorithm.ru page
******************************************/

let scrollEvent = window.pageYoffset;

//hide or open menu bar 
//******************************************************************************************************************
function hideMenu() {
let currentPos = window.pageYOffset;
	if (scrollEvent > currentPos || currentPos < 200) {
		document.querySelector("header").style.top = "0";
	} else {
		document.querySelector("header").style.top = "-45px";
	}
	scrollEvent = currentPos;
}

//hide or open returnUp button
//******************************************************************************************************************
function returnUpFunc() {
	let clientYOffset = window.pageYOffset;
	let clientHeight = window.innerHeight;
	let pageHeight = document.body.offsetHeight;
	let introHeight = document.querySelector(".introSec").offsetHeight;
	let footerHeight = document.querySelector("footer").offsetHeight;
	if (clientYOffset < introHeight) {
		document.getElementById("returnUp").style.right = "-60px";
	} 
	else if ((clientYOffset + clientHeight + footerHeight) > pageHeight) {
		document.getElementById("returnUp").style.right = "-60px";
	}
	else {
		document.getElementById("returnUp").style.right = "5vw";
	}
}


//get up on page function
//******************************************************************************************************************
function returnUp() {
	window.scrollTo({top: 0, behavior: "smooth"});
}

// Scroll to the contact session
//******************************************************************************************************************
function scrollToContacts() {
	document.getElementById("contacts").scrollIntoView();
}

//call functions on scroll
//******************************************************************************************************************
window.addEventListener("scroll", hideMenu);
window.addEventListener("scroll", returnUpFunc);

/********************************************************************************************************************
*
* SIDEBAR FUNCTIONS
*
********************************************************************************************************************/
let sideBarState = 0;

function changeSidebar() {
	if(sideBarState == 0){
		sideBarState = 1;
		sideBar.style.width = "100vw";
		document.getElementById("returnUp").style.display = "none";
		function changeSidebarInner() {
			let sideBarChildren = [...sideBar.children[0].children];
			sideBarChildren.forEach(element => {
				element.style.display = "block";
			});
			sideBar.children[1].style.opacity = "0.5";
		}
		setTimeout(changeSidebarInner, 500);
	} else {
		sideBarState = 0;
		sideBar.style.width = "0vw";
		document.getElementById("returnUp").style.display = "initial";
		function changeSidebarInner() {
			let sideBarChildren = [...sideBar.children[0].children];
			sideBarChildren.forEach(element => {
				element.style.display = "none";
			});
			sideBar.children[1].style.opacity = "0";
		}
		return changeSidebarInner();
	}
}

/********************************************************************************************************************
*
* SERVICE BLOCK FUNCTIONS
*
********************************************************************************************************************/
function changeServicePlanToVk() {
	var elem = document.getElementById("formBoxVK");
	var descriptionVisible = window.getComputedStyle(elem).getPropertyValue("display");
	if (descriptionVisible == "none") {
	document.getElementById("formBoxFacebook").style.display = "none";
	document.getElementById("titleFacebook").classList.add("serviceNotChosen");
	document.getElementById("titleFacebook").classList.remove("serviceChosen");
	document.getElementById("titleVK").classList.add("serviceChosen");
	document.getElementById("titleVK").classList.remove("serviceNotChosen");
	document.getElementById("formBoxVK").style.display = "flex";
	}
}
function changeServicePlanToFacebook() {
	var elem = document.getElementById("formBoxFacebook");
	var descriptionVisible = window.getComputedStyle(elem).getPropertyValue("display");
	if (descriptionVisible == "none") {
	document.getElementById("formBoxVK").style.display = "none";
	document.getElementById("titleVK").classList.add("serviceNotChosen");
	document.getElementById("titleVK").classList.remove("serviceChosen");
	document.getElementById("titleFacebook").classList.add("serviceChosen");
	document.getElementById("titleFacebook").classList.remove("serviceNotChosen");
	document.getElementById("formBoxFacebook").style.display = "flex";
	}
}


//collapse full service list
var chosenMoreDescription = 0;

function unfoldMoreDescription(clickedElementID) {
	var bodyEl = document.body;
	var chosenDescriptionElement = document.getElementById(clickedElementID);
	var nextSibling = chosenDescriptionElement.nextElementSibling;
	chosenMoreDescription = nextSibling;
	var viewerDisplayWidth = window.innerWidth;
	if (nextSibling.className == "moreDescription") {
		if (viewerDisplayWidth < 682) {
			nextSibling.classList.remove("moreDescription");
			nextSibling.classList.add("moreDescriptionShort");
			var childElem = nextSibling.children[0];
			childElem.classList.add("moreDescriptionShortWrapper");
			childElem = childElem.children[0];
			childElem.classList.add("moreDescriptionShortList");
			childElem = childElem.nextElementSibling;
			childElem.classList.add("moreDescriptionShortCloseBtn");
		} else {
			nextSibling.classList.remove("moreDescription");
			nextSibling.classList.add("moreDescriptionModal");
			var childElem = nextSibling.children[0];
			childElem.classList.add("moreDescriptionWrapperModal");
			childElem = childElem.children[0];
			childElem.classList.add("moreDescriptionListModal");
			childElem = childElem.nextElementSibling;
			childElem.classList.add("moreDescriptionCloseBtnModal");
			bodyEl.classList.add("modalBoxOpened");
		}
		} else {
		nextSibling.removeAttribute("class");
		nextSibling.classList.add("moreDescription");
		childElem = nextSibling.children[0];
		childElem.removeAttribute("class");
		childElem = childElem.children[0];
		childElem.removeAttribute("class");
		childElem = childElem.nextElementSibling;
		childElem.removeAttribute("class");
		}
}
function closeModal () {
var bodyEl = document.body;
chosenMoreDescription.removeAttribute("class");
chosenMoreDescription.classList.add("moreDescription");
childElem = chosenMoreDescription.children[0];
childElem.removeAttribute("class");
childElem = childElem.children[0];
childElem.removeAttribute("class");
childElem = childElem.nextElementSibling;
childElem.removeAttribute("class");
bodyEl.classList.remove("modalBoxOpened");
}

/********************************************************************************************************************
*
* CAROUSEL FUNCTIONS
*
********************************************************************************************************************/

let currentSlide = 1;
let futureSlide;
let carouselFrameWidth = 220;
let carouselShift;
let clientXstart = 0;
let clientXend;
let carouselSlideRatio;
const carouselThreshold = 0.2;

function carouselBtnChange(event) {
	if (event.target.id == "carBtnLeft" || event.target.parentElement.id == "carBtnLeft") {
		if (currentSlide > 1) {
				futureSlide = currentSlide - 1;
				carouselShift = (futureSlide - 1) * carouselFrameWidth;
				return carouselSwipe();
			} else {
				futureSlide = [...carouselBanner.children].length;
				carouselShift = (futureSlide - 1) * carouselFrameWidth;
				return carouselSwipe();
			}
		} else if (event.target.id == "carBtnRight" || event.target.parentElement.id == "carBtnRight") {
			if(currentSlide < 6) {
				futureSlide = currentSlide + 1;
				carouselShift = currentSlide * carouselFrameWidth;
				return carouselSwipe();
			} else {
				futureSlide = 1;
				carouselShift = (futureSlide - 1) * carouselFrameWidth;
				return carouselSwipe();
			}
		}
}

function carouselNavChange(event) {
	let carNavList = [...carouselNavigation.children];
	if (carNavList.includes(event.target)) {
		futureSlide = carNavList.indexOf(event.target) + 1;
		carouselShift = (futureSlide - 1) * carouselFrameWidth;
		return carouselSwipe();
	}
}

function carouselSlideChange(event) {
	switch (event.type) {
		case 'mousedown':
			clientXstart = Math.round(event.clientX);
			break;
		case 'mouseup':
			clientXend = Math.round(event.clientX);
			return carouselSlideChangeFinish();
		case 'touchstart':
			clientXstart = Math.round(event.touches[0].clientX);
			break;
		case 'touchend':
			clientXend = Math.round(event.changedTouches[0].clientX);
			return carouselSlideChangeFinish();
		default:
			break;
	}
}

function carouselSlideChangeFinish() {
	carouselSlideRatio = (Math.max(clientXstart, clientXend) - Math.min(clientXstart, clientXend))/200;
	if(carouselSlideRatio > carouselThreshold && carouselSlideRatio != 0){
		if (clientXstart < clientXend) {
			if (currentSlide > 1) {
				futureSlide = currentSlide - 1;
				carouselShift = (futureSlide - 1) * carouselFrameWidth;
				return carouselSwipe();
			} else {
				futureSlide = [...carouselBanner.children].length;
				carouselShift = (futureSlide - 1) * carouselFrameWidth;
				return carouselSwipe();
			};
		} else {
			if(currentSlide < 6) {
				futureSlide = currentSlide + 1;
				carouselShift = currentSlide * carouselFrameWidth;
				return carouselSwipe();
			} else {
				futureSlide = 1;
				carouselShift = (futureSlide - 1) * carouselFrameWidth;
				return carouselSwipe();
			};
		};
	}
}

function carouselSwipe() {
	carouselBanner.style.left = `-${carouselShift}px`;
	carouselNavigationList[currentSlide - 1].classList.remove("carouselNavigationActive");
	carouselNavigationList[futureSlide - 1].classList.add("carouselNavigationActive");
	currentSlide = futureSlide;
}

/********************************************************************************************************************
*
* FAQ FUNCTIONS
*
********************************************************************************************************************/

function clickQuestionFAQ(event) {
	const chosenElem = event.target;
	if (chosenElem.className == "sectionFAQquestion") {
		const nextSibling = chosenElem.nextElementSibling;
		const nextSiblingTrueHeight = nextSibling.scrollHeight;
		const childElem = chosenElem.children;
			if (window.getComputedStyle(nextSibling).getPropertyValue("height") == "0px") {
				chosenElem.style.backgroundColor = "rgb(200, 200, 250)";
				nextSibling.style.backgroundColor = "rgb(200, 200, 250)";
				nextSibling.style.height = nextSiblingTrueHeight + "px";
				nextSibling.style.paddingBottom = "20px";
				childElem[1].classList.remove("questionFAQbuttonRotateBack");
				childElem[1].classList.add("questionFAQbuttonRotate");
			} else {
				chosenElem.style.backgroundColor = "rgb(255, 255, 255)";
				nextSibling.style.backgroundColor = "rgb(255, 255, 255)";
				nextSibling.style.height = "0px";
				nextSibling.style.paddingBottom = "0px";
				childElem[1].classList.add("questionFAQbuttonRotateBack");
				childElem[1].classList.remove("questionFAQbuttonRotate");
			}
	} else if (chosenElem.className == "questionFAQ" || chosenElem.classList.contains("questionFAQbutton")) {
		const parentElem = chosenElem.parentElement;
		const uncleElement = chosenElem.parentElement.nextElementSibling;
		const uncleElementTrueHeight = uncleElement.scrollHeight;
		const buttonChild = chosenElem.parentElement.children;
			if (window.getComputedStyle(uncleElement).getPropertyValue("height") == "0px") {
				parentElem.style.backgroundColor = "rgb(200, 200, 250)";
				uncleElement.style.backgroundColor = "rgb(200, 200, 250)";
				uncleElement.style.height = uncleElementTrueHeight + "px";
				uncleElement.style.paddingBottom = "20px";
				buttonChild[1].classList.remove("questionFAQbuttonRotateBack");
				buttonChild[1].classList.add("questionFAQbuttonRotate");
			} else {
				parentElem.style.backgroundColor = "rgb(255, 255, 255)";
				uncleElement.style.backgroundColor = "rgb(255, 255, 255)";
				uncleElement.style.height = "0px";
				uncleElement.style.paddingBottom = "0px";
				buttonChild[1].classList.add("questionFAQbuttonRotateBack");
				buttonChild[1].classList.remove("questionFAQbuttonRotate");
			}
	}
}


window.onload = function() {
const scrollBarWidth = window.innerWidth - document.documentElement.offsetWidth;
document.documentElement.style.cssText = "--scrollBarWidth: " + scrollBarWidth + "px";
}

/********************************************************************************************************************
*
* FEEDBACK FORM FUNCTIONS
*
********************************************************************************************************************/

let formConditionCheck = 0;

function changeFormCondition(e) {
	
	formConditionCheck == 0 ? formOpen() : formClose(e);
	function formOpen () {
		modalForm.style.display = 'initial';
		formConditionCheck = 1;
		document.body.classList.add('modalBoxOpened');
	}
	function formClose(e) {
		if (e.target.className == 'formMainWrapper' || e.target.id == 'submitForm' || e.target.id == 'closeForm') {
		modalForm.style.display = 'none';
		document.body.classList.remove('modalBoxOpened');
		formConditionCheck = 0;
		}
	}
}