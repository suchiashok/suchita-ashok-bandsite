import BandSiteApi from "./band-site-api.js";

const BandApi = new BandSiteApi("37a62273-2e78-413f-befb-0357b75e2328");

const main = document.querySelector('main');
const showsSection = document.createElement("section");
showsSection.classList.add("shows");
main.appendChild(showsSection);

const title = document.createElement("h2");
title.classList.add("shows__title");
document.querySelector(".shows").appendChild(title);
title.innerText = "Shows";
showsSection.appendChild(title);

//function to create the labels for the tablet/desktop view
function createTabletLabels() {
    const labelsContainer = createElementWithClass("div", "shows__labels");

    const dateLabelTabEl = createElementWithClass("span", "shows__dateLabel-Tab");
    dateLabelTabEl.innerText = "DATE";
    labelsContainer.appendChild(dateLabelTabEl);

    const venueLabelTabEl = createElementWithClass("span", "shows__venueLabel-Tab");
    venueLabelTabEl.innerText = "VENUE";
    labelsContainer.appendChild(venueLabelTabEl);

    const locationLabelTabEl = createElementWithClass("span", "shows__locationLabel-Tab");
    locationLabelTabEl.innerText = "LOCATION";
    labelsContainer.appendChild(locationLabelTabEl);

    return labelsContainer;
}


const showsAll = document.createElement("div");
showsAll.classList.add("shows__all");
showsSection.appendChild(showsAll);

const labelsContainer = createTabletLabels();
showsAll.appendChild(labelsContainer);

async function showsApi() {
    try {
        const fetchShows = await BandApi.getShows();
        
        fetchShows.forEach(show => {
            const eachShowEl = createShowsContent(show);
            showsAll.appendChild(eachShowEl);
        });
    } catch (error) {
        console.log('Error displaying shows',error);
    }
}

showsApi();

//function to create elements with class names
function createElementWithClass(elementName, className) {
    const el = document.createElement(elementName);
    el.classList.add(className);
    return el;
}

function createShowsContent(showEl) {
    //div for each show
    //appending date,venue,location to the parent child
    const eachShowEl = createElementWithClass("div","shows__eachShow")

    const dateEl = createShowDate(showEl)
    eachShowEl.appendChild(dateEl);

    const venueEl = createShowVenue(showEl)
    eachShowEl.appendChild(venueEl);

    const locationEl = createShowLocation(showEl)
    eachShowEl.appendChild(locationEl);

    const buttonEl = createShowButton();
    eachShowEl.appendChild(buttonEl);

    eachShowEl.addEventListener('click',showClick);

    return eachShowEl;

}

function formatDate(timestamp) {
    try {
        const date = new Date(timestamp);
        const showDateFormat = { weekday: "short", month: "short", day: "2-digit", year: "numeric"};
        const formattedDate = date.toLocaleDateString('en-US', showDateFormat);
        return formattedDate.replace(',','');
    } catch (error) {
        console.log("error",error);
    }
}

//function for Date  
function createShowDate(show) {
    const dateEl = createElementWithClass("div","shows__date")

    const dateLabelEl = createElementWithClass("span", "shows__date-label");
    dateLabelEl.innerText = "DATE";
    dateEl.appendChild(dateLabelEl);
 
    const formattedDate = formatDate(show.date);
    const dateInfoEl = createElementWithClass("span", "shows__date-info");
    dateInfoEl.innerText = formattedDate;
    dateEl.appendChild(dateInfoEl);

    return dateEl;
}

//function for Venue
function createShowVenue(place) {

    const venueEl = createElementWithClass("div","shows__venue")

    const venueLabelEl = createElementWithClass("span", "shows__venue-label");
    venueLabelEl.innerText = "VENUE" ;
    venueEl.appendChild(venueLabelEl);

    const venueInfoEl = createElementWithClass("span", "shows__venue-info");
    venueInfoEl.innerText = place.place;
    venueEl.appendChild(venueInfoEl);

    return venueEl;
}

//function for Location 
function createShowLocation(location) {

    const locationEl = createElementWithClass("div","shows__location")

    const locationLabelEl = createElementWithClass("span", "shows__location-label");
    locationLabelEl.innerText = "LOCATION";
    locationEl.appendChild(locationLabelEl);

    const locationInfoEl = createElementWithClass("span", "shows__location-info");
    locationInfoEl.innerText = location.location;
    locationEl.appendChild(locationInfoEl);

    return locationEl;
}

//function for 'buy tickets' button
function createShowButton() {
    const buttonEl = createElementWithClass("button", "shows__button")
    buttonEl.innerText = "BUY TICKETS";
    return buttonEl;
}

function showClick(event) {
    const clickedItem = event.currentTarget;
    const isSelected = clickedItem.getAttribute('show-selected');

    if(isSelected === 'true') {
        clickedItem.removeAttribute('show-selected');
    }
    else {
        const previouslySelected = document.querySelector('.shows__eachShow[show-selected="true"]');
        if (previouslySelected) {
            previouslySelected.removeAttribute('show-selected');
        }
        clickedItem.setAttribute('show-selected','true');
    }
}