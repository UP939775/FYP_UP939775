const socket = io();
let element = {}
let x = [];

function getLocationID() {
    return window.location.hash.substring(1);
}

async function getTestData(parks) {
    const response = await fetch(`../test-data`);
    if (response.ok) {
        parks = await response.json();
        } else {
        parks = { error: 'This location cannot be found. Please return to the home page' };
        element.parkTitle.textContent = parks.error
    }
    let counter = 0

    let array = [];

    for (const park of parks) {
        element.park = document.createElement('div');
        element.park.className = 'park-test';
        element.park.id = park['Park ID']
        element.container.append(element.park);

        element.parkName = document.createElement('h3');
        element.parkName.className = 'park-name-test';
        element.parkName.textContent = `Park Name: ${park['Park Name']}   -   Park ID: ${park['Park ID']}`;
        element.park.append(element.parkName);

        counter++

        for (const [key, value] of Object.entries(park)) {
            if(value === 1 || value === 0){
                element.checkboxTest = document.createElement('div');
                element.checkboxTest.className = `park-checkbox-test ${park['Park ID']}`;
                element.park.append(element.checkboxTest);

                element.checkboxLabel = document.createElement('label');
                element.checkboxLabel.textContent = `${key}`;
                element.checkboxLabel.for = 'checkbox';
                element.checkboxTest.append(element.checkboxLabel);

                element.tickbox = document.createElement('input');
                element.tickbox.type = 'checkbox'
                element.tickbox.id = `${park['Park ID'].substring(0,8).toUpperCase()}-${element.checkboxLabel.textContent.match(/[A-Z]/g).join('').toUpperCase()}`;
                element.tickbox.className = 'tickbox';

                if(value === 1) {
                    element.tickbox.checked = true;
                }
                element.checkboxTest.append(element.tickbox);
            }
            array.push(value);
        }
        x.push(array)
        array = [];    
    }

    element.tickboxes = document.querySelectorAll('.tickbox');
    for (const tickbox of element.tickboxes) {
        tickbox.addEventListener('change', getTickbox); 
    }

    element.tickboxes = document.querySelectorAll('.park-test');
    
}

function getInfo(tickboxElement) {
    element.tickboxes = document.querySelectorAll('.tickbox');

    let avName = tickboxElement.id.substring(9,tickboxElement.id.length).toLowerCase() + '_available'
    let avTimestamp = tickboxElement.id.substring(9,tickboxElement.id.length).toLowerCase() + '_timestamp'
    let facID = `${tickboxElement.id}`;
    console.log(tickboxElement);
    let parkID = tickboxElement.parentNode.parentNode.id

    let array = [parkID, avTimestamp, avName, facID];

    return array     
}


function getTickbox() {
    let value;
    let timeStamp = new Date();
    timeStamp = timeStamp.toString().substring(0,25);

    let result = getInfo(this);

    if (this.checked) {

        value = true;

    } else if(!this.checked){

        value = false

    }
    result.push(value, timeStamp)
    updateSystem(result)
}

function updateSystem(result){
    if(this.checked === true) {

        result[3] = true

    } else if(this.checked === false) {

        result[3] = false

    }
    socket.emit('checkbox', result);
}

//DOM ELEMENTS FUNCTION
function domElements() {
    element.container = document.querySelector('#testing-main');
    element.header = document.querySelector('.header');
}

// EVENT LISTENERS FUNCTION
function prepareEventListeners() {
       
    
}

//PAGE LOADED FUNCTION 
function pageLoaded(){
    domElements();
    prepareEventListeners();
    getTestData();

    console.log('Page Loaded...');
}

window.addEventListener('load', pageLoaded);