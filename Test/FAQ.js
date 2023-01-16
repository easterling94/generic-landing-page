/******************************************
* targorithm.js
* by easterling94
* 
* This file contains all scripts for 
* targorithm.ru page
******************************************/


var scrollEvent = window.pageYoffset;


//hide or open menu bar
function hideMenu() {
var currentPos = window.pageYOffset;
	if (scrollEvent > currentPos || currentPos < 200) {
		document.getElementById("mainWrapper").style.top = "0";
	} else {
		document.getElementById("mainWrapper").style.top = "-65px";
	}
	scrollEvent = currentPos;
}


//hide or open returnUp button
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
function returnUp() {
	window.scrollTo({top: 0, behavior: "smooth"});
}


//open and close menu function
function openNav() {
	var bodyEl = document.body;
	document.getElementById("menuRight").style.display = "initial";
	document.getElementById("menuRightList").style.display = "initial";
	document.getElementById("returnUp").style.display = "none";
	document.getElementById("logoItems").style.display = "flex";
	document.getElementById("menuRight").style.width = "60%";
	document.getElementById("closeBtnMenu").style.display = "initial";
	bodyEl.classList.add("modalBoxOpened");
}
function closeNav() {
	var bodyEl = document.body;
	document.getElementById("closeBtnMenu").style.display = "none";
	document.getElementById("returnUp").style.display = "initial";
	document.getElementById("logoItems").style.display = "none";
	document.getElementById("menuRightList").style.display = "none";
	document.getElementById("menuRight").style.width = "0";
	bodyEl.classList.remove("modalBoxOpened");
}


//
function scrollToContacts() {
document.getElementById("contacts").scrollIntoView();
}


//functions for SERVICE block
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


//call functions on scroll
window.addEventListener("scroll", hideMenu);
window.addEventListener("scroll", returnUpFunc);


//unfold FAQ answers
function clickQuestionFAQ(event) {
	const chosenElem = event.target;
	const childElem = chosenElem.children;
	const chosenElemSibling = chosenElem.nextElementSibling;
	if (chosenElemSibling.classList.contains("sectionFAQanswerDisplayNone")) {
		chosenElem.style.backgroundColor = "rgba(130, 130, 180, 0.1)";
		chosenElemSibling.classList.toggle("sectionFAQanswerDisplayNone");
		childElem[1].classList.remove("questionFAQbuttonRotateBack");
		childElem[1].classList.add("questionFAQbuttonRotate");
	} else {
		chosenElem.style.backgroundColor = "rgba(150, 150, 200, 0)";
		chosenElemSibling.classList.toggle("sectionFAQanswerDisplayNone");
		childElem[1].classList.remove("questionFAQbuttonRotate");
		childElem[1].classList.add("questionFAQbuttonRotateBack");
	}
}


// carousel functions
let clientXstart;
let clientXend;
let carouselShift = 0;
let carouselFrameWidth = 200;


function carouselEvent(event) {
	switch (event.type) {
		case "mousedown":
			clientXstart = event.clientX;
			break;
		case "mouseup":
			clientXend = event.clientX;
			if (clientXstart > clientXend) {
				carouselShift += carouselFrameWidth;
				carouseChild.style.left = "-" + carouselShift + "px";
			}
			else {
				carouselShift -= carouselFrameWidth;
				carouseChild.style.left = "-" + carouselShift + "px";
			}
			break;
		case "touchstart":
			bodyScroll.classList.add("stopScrolling");
			clientXstart = event.touches[0].clientX;
			break;
		case "touchend":
			bodyScroll.classList.remove("stopScrolling");
			clientXend = event.changedTouches[0].clientX;
			if (clientXstart > clientXend) {
				carouselShift += carouselFrameWidth;
				carouseChild.style.left = "-" + carouselShift + "px";
			}
			else {
				carouselShift -= carouselFrameWidth;
				carouseChild.style.left = "-" + carouselShift + "px";
			}
			break;
	}
}
/*
window.onload = function() {
const scrollBarWidth = window.innerWidth - document.documentElement.offsetWidth;
document.documentElement.style.cssText = "--scrollBarWidth: " + scrollBarWidth + "px";
}
*/