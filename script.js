let contactList = [];

// display screens
const displayScreen = (screenName) => {
  let screens = document.getElementsByClassName("screen");

  for (screen of screens) {
    screen.classList.add("hidden");
  }

  let selectedScreen = document.getElementById(screenName);

  selectedScreen.classList.remove("hidden");
};

// get the slider element
let sliderElement = document.getElementById("slide");

// unlock phone
sliderElement.addEventListener("change", (event) => {
  console.log(event.target.value);

  if (event.target.value == "100") {
    displayScreen("app-screen");
  } else {
    sliderElement.value = 0;
  }
});

// function to fetch contact list
const fetchContactList = async () => {
  const response = await fetch("https://randomuser.me/api?results=3");
  const data = await response.json();
  console.log(data.results);

  contactList = data.results;

  let contactListElement = document.getElementById("contactList");

  let accItems = "";

  let contactNo = 0;

  for (contact of contactList) {
    contactNo += 1;
    console.log(contact);
    let accItem = ` <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#contact-${contactNo}" aria-expanded="true" aria-controls="contact-${contactNo}">
                                <img src="${contact.picture.thumbnail}" />
                                <div>
                                    <div>${contact.name.first} ${contact.name.last}</div>
                                    <div>Location</div>
                                </div>

                            </button>
                        </h2>
                        <div id="contact-${contactNo}" class="accordion-collapse collapse"
                            data-bs-parent="#contactList">
                            <div class="accordion-body">
                                <div>
                                    <img src="${contact.picture.large}" alt="">
                                </div>
                                <div>
                                    <span>NAME</span>
                                    <span>PHONE</span>
                                    <span>Email</span>
                                    <span>Location</span>
                                </div>

                            </div>
                        </div>
                    </div>`;

    accItems += accItem;
  }

  contactListElement.innerHTML = accItems;
};

// get the app element
let appElement = document.getElementById("app1");
appElement.addEventListener("click", () => {
  displayScreen("contact-screen");
  fetchContactList();
});

const updateTime = () => {
  let date = new Date();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();

  let timeSpans = document.getElementsByClassName("time");

  for (elem of timeSpans) {
    elem.innerText = currentHour + " : " + currentMinute;
  }
};

updateTime();

setInterval(updateTime, 60000);
