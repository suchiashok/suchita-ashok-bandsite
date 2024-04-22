const showsArray = [
    {
        date: {
            label: "DATE",
            info: "Mon Sept 09 2024"
        },
        venue: {
            label: "VENUE",
            info: "Ronald Lane"
        },
        location: {
            label: "LOCATION",
            info: "San Francisco, CA"
        }
    },
    {
        date: {
            label: "DATE",
            info: "Tue Sept 17 2024"
        },
        venue: {
            label: "VENUE",
            info: "Pier 3 East"
        },
        location: {
            label: "LOCATION",
            info: "San Francisco, CA"
        }
    },
    {
        date: {
            label: "DATE",
            info: "Sat Oct 12 2024"
        },
        venue: {
            label: "VENUE",
            info: "View Lounge"
        },
        location: {
            label: "LOCATION",
            info: "San Francisco, CA"
        }
    },
    {
        date: {
            label: "DATE",
            info: "Sat Nov 16 2024"
        },
        venue: {
            label: "VENUE",
            info: "Hyatt Agency"
        },
        location: {
            label: "LOCATION",
            info: "San Francisco, CA"
        }
    },
    {
        date: {
            label: "DATE",
            info: "Fri Nov 29 2024"
        },
        venue: {
            label: "VENUE",
            info: "Moscow Center"
        },
        location: {
            label: "LOCATION",
            info: "San Francisco, CA"
        }
    },
    {
        date: {
            label: "DATE",
            info: "Wed Dec 18 2024 "
        },
        venue: {
            label: "VENUE",
            info: "Press Club"
        },
        location: {
            label: "LOCATION",
            info: "San Francisco, CA"
        }
    },

]

const showsSection = document.createElement("section");
showsSection.classList.add("shows");
document.body.appendChild(showsSection);

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

showsArray.forEach(show => {
    const eachShowEl = createShowsContent(show);
    showsAll.appendChild(eachShowEl);
})

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

    const dateEl = createShowDate(showEl.date)
    eachShowEl.appendChild(dateEl);

    const venueEl = createShowVenue(showEl.venue)
    eachShowEl.appendChild(venueEl);

    const locationEl = createShowLocation(showEl.location)
    eachShowEl.appendChild(locationEl);

    const buttonEl = createShowButton();
    eachShowEl.appendChild(buttonEl);

    eachShowEl.addEventListener('click',showClick);

    return eachShowEl;

}

//function for Date  
function createShowDate(date) {

    const dateEl = createElementWithClass("div","shows__date")

    const dateLabelEl = createElementWithClass("span", "shows__date-label");
    dateLabelEl.innerText = date.label;
    dateEl.appendChild(dateLabelEl);

    const dateInfoEl = createElementWithClass("span", "shows__date-info");
    dateInfoEl.innerText = date.info;
    dateEl.appendChild(dateInfoEl);

    return dateEl;
}

//function for Venue
function createShowVenue(venue) {

    const venueEl = createElementWithClass("div","shows__venue")

    const venueLabelEl = createElementWithClass("span", "shows__venue-label");
    venueLabelEl.innerText = venue.label;
    venueEl.appendChild(venueLabelEl);

    const venueInfoEl = createElementWithClass("span", "shows__venue-info");
    venueInfoEl.innerText = venue.info;
    venueEl.appendChild(venueInfoEl);

    return venueEl;
}

//function for Location 
function createShowLocation(location) {

    const locationEl = createElementWithClass("div","shows__location")

    const locationLabelEl = createElementWithClass("span", "shows__location-label");
    locationLabelEl.innerText = location.label;
    locationEl.appendChild(locationLabelEl);

    const locationInfoEl = createElementWithClass("span", "shows__location-info");
    locationInfoEl.innerText = location.info;
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