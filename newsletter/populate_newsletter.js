
// Filepath for json events
const eventJSON = "./example-events.json"

/**
 * Appends a new event to <body>
 * @param event - an event, in json format
 */
function newEvent(event) {
    const eventcontainer = document.createElement('div')
    eventcontainer.id = "eventcontainer";

    const calendarcontainer = document.createElement('div')
    calendarcontainer.id = "calendarcontainer";

    const date_array = event["date"].split(" ");

    const calendarmonth = document.createElement('div')
    calendarmonth.id = "calendarmonth";
    calendarmonth.textContent = date_array[0].toUpperCase()

    const calendarday = document.createElement('div')
    calendarday.id = "calendarday";
    calendarday.textContent = date_array[1].toUpperCase()

    const eventcontent = document.createElement('div')
    eventcontent.id = "eventcontent";

    const h2 = document.createElement('h2')
    h2.textContent = event["name"];

    const h3 = document.createElement('h3')
    h3.textContent = event["location"];

    const link = document.createElement('a')
    link.id = "learnmore"
    link.href = event["url"];
    link.target = "_blank"
    link.textContent = "Learn More >>";

    eventcontent.append(h2, h3,event["description"], link)
    calendarcontainer.append(calendarmonth, calendarday)
    eventcontainer.append(calendarcontainer, eventcontent)

    document.body.appendChild(eventcontainer)
}

/**
 * Iterates through all events in a JSON array, then adds footer
 * @param events - JSON array of all events
 */
function populate(events) {   
    for(let i = events.length - 1; i != 0; i--) {
        newEvent(events[i])
    }
    const footer = document.createElement('footer')
    footer.textContent = "❉ this email was sent from touchGrass ❉ ";
    document.body.appendChild(footer)
}

/**
 * Driver code to fetch JSON.
 */
fetch(eventJSON)
  .then((response) => response.json())
  .then((data) => populate(data));