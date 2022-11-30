
// const body = document.querySelector('#recently-played-section');

const eventJSON = "./example-events.json"

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

    // const h3 = document.createElement('h3')
    // h3.textContent = ;

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

function populate(events) {   
    for(let i = events.length - 1; i != 0; i--) {
        console.log(events[i])
        newEvent(events[i])
    }

    const footer = document.createElement('footer')
    footer.textContent = "❉ this email was sent from touchGrass ❉ ";
    document.body.appendChild(footer)

}

fetch(eventJSON)
  .then((response) => response.json())
  .then((data) => populate(data));