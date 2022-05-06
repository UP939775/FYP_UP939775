const socket = io();
let element = {};

let facility = {}

function createCardElement(elemName, elType, className, content, where){
    elemName = document.createElement(elType);
    elemName.textContent = content;
    elemName.className = className;
    where.append(elemName);
}

function getLocationID() {
    return window.location.hash.substring(1);
}

async function loadParkDetails(park) {
    element.parkTitle.textContent = park.park_name
    element.parkAddress.textContent = `Address: ${park.park_address} ${park.park_town} ${park.park_postcode} `;

}


async function createFacilities(park) {
    
    const id = getLocationID();
    const response = await fetch(`get-facilities/${id}`);
    if (response.ok) {
        park = await response.json();

        
        } else {
        park = { error: 'This location cannot be found. Please return to the home page' };
        element.parkTitle.textContent = park.error
    }

    let facilitiesArray = []

    for (const [key, value] of Object.entries(park)) {
        facilitiesArray.push(value);
    }

    facilitiesArray.shift();


    for (let i = 0; i <= facilitiesArray.length + 1; i++) {
        if(facilitiesArray[i] === 1){
            element.facilityOptions[i].innerHTML = '&#10003;';
            
        } else if(facilitiesArray[i] === 0){
            element.facilityOptions[i].innerHTML = '&#10007;'
        }  
   }    
}

async function getAvailibility(park, park_avail) {
    const id = getLocationID();
    const response = await fetch(`get-facility-availibility/${id}`);
    if (response.ok) {
        park = await response.json();
        } else {
        park = { error: 'This location cannot be found. Please return to the home page' };
        element.parkTitle.textContent = park.error
    }

    let counter = 0;
    

    for (const [key, value] of Object.entries(park)) {


  
        if (value === 1 || value === 0) {
            

            element.availibility = document.createElement('div');
            element.availibility.className = 'availibility';
            element.x[1].append(element.availibility);

            element.availibilityName = document.createElement('div');
            element.availibilityName.className = 'availibility-name'
            element.availibilityName.textContent = key;
            element.availibility.append(element.availibilityName)

            element.availibilityOption = document.createElement('div');
            element.availibilityOption.className = 'availibility-option'

            let facilityID = `${getLocationID().substring(0,8).toUpperCase()}-${element.availibilityName.textContent.match(/[A-Z]/g).join('').toUpperCase()}`
            
            element.availibility.append(element.availibilityOption);
            element.availibilityOption.id = `${facilityID}`
            

            let Available = `${element.availibilityName.textContent.match(/[A-Z]/g).join('').toLowerCase() + '_timestamp'}`

            
            if(value === 1) {
                element.availibilityOption.textContent = [`In Use Since: ${park[`${Available}`]}`];
            } else if(value === 0) {
                element.availibilityOption.textContent = `Available Since: ${park[`${Available}`]}`;
            }

            
                
            
    
        }
        counter++
    }
    element.availibiltyOptions = document.querySelectorAll('.availibility-option');

}

async function pageConfig() {
    const id = getLocationID();
    const response = await fetch(`get-park/${id}`);
    let park;
    if (response.ok) {
        park = await response.json();
        loadParkDetails(park)
        createFacilities(park);
        } else {
        park = { error: 'This location cannot be found. Please return to the home page' };
        element.parkTitle.textContent = park.error
    }
}


function expandSection(sections) {
    this.classList.toggle("active");

    let sectionDropdown = this.nextElementSibling;
    if (sectionDropdown.style.display === 'block') {
        sectionDropdown.style.display = 'none';
    } else {
        sectionDropdown.style.display = 'block';
      };
}

async function changeAvail(result) {
    element.availibiltyOptions = document.querySelectorAll('.availibility-option');
    
    for (let i = 0; i < element.availibiltyOptions.length; i++) {      
        console.log(result[3] + ' '+ element.availibiltyOptions[i].id)
        if(element.availibiltyOptions[i].id === result[3]) {
            if(result[4] === true){
                element.availibiltyOptions[i].textContent = `In Use Since: ${result[5]}`
            } else if (result[4] === false) {
                element.availibiltyOptions[i].textContent = `Available Since: ${result[5]}`
            }

        }
   
    }
}





//DOM ELEMENTS FUNCTION
function domElements() {
    element.locationSections = document.querySelectorAll('.location-section');
    element.parkTitle = document.querySelector('#location-title');
    element.parkAddress = document.querySelector('#park-address');
    element.facilityOptions = document.querySelectorAll('.facility-option');
    element.facilityName = document.querySelectorAll('.facility-name');
    

    element.x = document.querySelectorAll('.section-dropdown')
}

// EVENT LISTENERS FUNCTION
function prepareEventListeners() {
    for (let i = 0; i < element.locationSections.length; i++) {
        element.locationSections[i].addEventListener('click', expandSection); 
    }
}

//PAGE LOADED FUNCTION 
function pageLoaded(){
    domElements();
    prepareEventListeners();
    pageConfig();
    getAvailibility();

    console.log('Page Loaded...');

    socket.on('change', (result) => {
        console.log(result);
        tickedbox = result[4];
        changeAvail(result);
    });
}

window.addEventListener('load', pageLoaded);