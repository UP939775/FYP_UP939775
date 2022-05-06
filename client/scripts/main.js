let element = {};

function createCardElement(elemName, elType, className, content, where){
    elemName = document.createElement(elType);
    elemName.textContent = content;
    elemName.className = className;
    where.append(elemName);
}

function displayLocations(locations){
    for (const location of locations) {
        const locationCard = document.createElement('div');
        locationCard.className = 'location-card';
        element.container.append(locationCard);

        createCardElement('locationTitle', 'h2', 'location-title', location.park_name, locationCard);

        const viewButton = document.createElement('a');
        viewButton.textContent = 'View Park';
        viewButton.className = 'default-button';
        locationCard.append(viewButton);
        viewButton.href = `/park-location.html#${location.park_id}`;
    }

}

async function loadLocations() {
    const response = await fetch('locations');
    let locations;
    if (response.ok) {
        locations = await response.json();
      } else {
        locations = [{ msg: 'Unable to load park locations, please refresh page' }];
      }

      displayLocations(locations);
    return locations
}

async function initMap() {
    map = new google.maps.Map(document.getElementById('main-map'), {
        center: {lat: 50.80691578710422, lng: -1.07415043650875},
        zoom: 13,
        mapTypeControl: false,
        fullscreenControl: false,
    });

    const response = await fetch('locations');
    let locations;
    if (response.ok) {
        locations = await response.json();
      } else {
        locations = [{ msg: 'Unable to load park locations, please refresh page' }];
    }

    
    
    for (let i = 0; i < locations.length; i++) {

        const contentString =
            `<div id="marker-content">
                <h1 id="marker-heading" class="firstHeading">${locations[i].park_name}</h1>
                <div id="marker-body">
                    <h3><a href="/park-location.html#${locations[i].park_id}">View Park</h2> 
                </div>
            </div>`;

        let marker = new google.maps.Marker({
            position: {lat: Number(locations[i].park_lan), lng: Number(locations[i].park_lon)},
            map: map,

        });

        const infowindow = new google.maps.InfoWindow({
                    content: contentString
        });

        marker.addListener("click", () => {
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
        });
    }
};

function clearDOM(view) {
    // for (const [key, value] of Object.entries(element)) {
    //     value.style.display = 'none';
    // }
    if(view === 'MAP') {
        element.container.style.display = 'none'
    } else {
        element.mainMap.style.display = 'none'
    }
    
}

function viewSwitch(view) {
    element.mapViewButton
}

function mapSelector() {
    clearDOM('MAP');
    element.mapViewButton.style.display = 'block';
    element.listViewButton.style.display = 'block';
    element.mainMap.style.display = 'block';
}

function listSelector() {
    clearDOM();
    element.mapViewButton.style.display = 'block';
    element.listViewButton.style.display = 'block';
    element.container.style.display = 'flex';
}

//DOM ELEMENTS FUNCTION
function domElements() {
    element.listViewButton = document.querySelector('#list-view');
    element.mapViewButton = document.querySelector('#map-view');
    element.mainMap = document.querySelector('#main-map');
    element.container = document.querySelector('.list-view');

    element.locationCards = document.querySelectorAll('.location-card')
}

// EVENT LISTENERS FUNCTION
function prepareEventListeners() {
    element.listViewButton.addEventListener('click', listSelector);
    element.mapViewButton.addEventListener('click', mapSelector);
}

//PAGE LOADED FUNCTION 
function pageLoaded(){
    domElements();
    prepareEventListeners();
    loadLocations();

    console.log('Page Loaded...');
}

window.addEventListener('load', pageLoaded);