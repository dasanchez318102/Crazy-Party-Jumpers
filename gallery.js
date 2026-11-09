const gallerygallery = document.querySelector("#gallerygallery");
const buttons = document.querySelectorAll(".gallery-filters button");


const events = [
    {
       image: "images/birthday1.jpg",
        title: "Birthday Party",
        category: "birthday",
        size: "large"
    },
 {
        image: "images/birthday.jpg",
        title: "Birthday Party",
        category: "birthday"
    }, {
        image: "images/birthday.jpg",
        title: "Birthday Party",
        category: "birthday"
    }, {
        image: "images/birthday.jpg",
        title: "Birthday Party",
        category: "birthday"
    },
];


function displayEvents(evenList) {

    gallerygallery.innerHTML = "";

    evenList.forEach((event) => {

        gallerygallery.innerHTML += `

            <div class="gallery-card ${event.size}">


                <img src="${event.image}" alt="${event.title}">

                <h3>${event.title}</h3>

            </div>

        `;

    });

}


displayEvents(events);


buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        if (selectedCategory === "all") {

            displayEvents(events);

        } else {

            const filteredEvents = events.filter((event) => {

                return event.category === selectedCategory;

            });

            displayEvents(filteredEvents);

        }

    });

});