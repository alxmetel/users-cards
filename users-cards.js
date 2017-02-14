var menuBtn = document.getElementById("menuBtn");
var hamburgerMenu = document.getElementsByClassName("hamburger")[0];
var menu = document.getElementById("menu");
var content = document.getElementById("content");

hamburgerMenu.addEventListener("click", function(){
	this.classList.add("is-active");
});
hamburgerMenu.addEventListener("click", openMenu);

function openMenu() {
    menu.style.right = "150px";
}

var workerCheckbox = document.getElementById("workerCheckbox");
var studentCheckbox = document.getElementById("studentCheckbox");
var housewifeCheckbox = document.getElementById("housewifeCheckbox");

workerCheckbox.addEventListener("click", workerCheckboxManager);
studentCheckbox.addEventListener("click", studentCheckboxManager);
housewifeCheckbox.addEventListener("click", housewifeCheckboxManager);

// "База данных" Занятий
var occupationsDB = {
	worker: "Worker",
	student: "Student",
	housewife: "Housewife"
}

var defaultAvatar = "https://www.kirkleescollege.ac.uk/wp-content/uploads/2015/09/default-avatar.png";

// "База данных" юзеров
var workersDB = {};
var studentsDB = {};
var housewivesDB = {};

workersDB.worker1 = {
	firstName: "Alexander",
	lastName: "Metelchenko",
	photo: defaultAvatar,
	occupation: occupationsDB.worker,
};

workersDB.worker2 = {
	firstName: "Will",
	lastName: "Smith",
	photo: "https://pbs.twimg.com/profile_images/598193182833135616/H_H9SZgx.jpg",
	occupation: occupationsDB.worker,
};

studentsDB.student1 = {
	firstName: "Kevin",
	lastName: "Spacey",
	photo: "http://speakerdata2.s3.amazonaws.com/photo/image/817928/c99aa2404369463ef5baa1b65da50d7b.jpeg",
	occupation: occupationsDB.student,
};

studentsDB.student2 = {
	firstName: "Tom",
	lastName: "Hanks",
	photo: "https://pbs.twimg.com/profile_images/686331609411399680/-IT6Tx6J.jpg",
	occupation: occupationsDB.student,
};

housewivesDB.housewife1 = {
	firstName: "Angelina",
	lastName: "Jolie",
	photo: "https://pbs.twimg.com/profile_images/698942162663247872/Y8djIT2u.jpg",
	occupation: occupationsDB.housewife,
};

housewivesDB.housewife2 = {
	firstName: "Natalie",
	lastName: "Portman",
	photo: "https://s-media-cache-ak0.pinimg.com/favicons/8bff8ad922cef83dda0ecce925e64578feee439c2247263db44edffa.png",
	occupation: occupationsDB.housewife,
};

function createGenericCard() {

	// Создаем div карточки, добавляем класс
	var card = document.createElement("div");
	content.appendChild(card);
	card.classList.add("card");

	// Создаем секцию для Имени и Фамилии
	var moduleFirstName = document.createElement("div");
	var img = document.createElement("img");
	var input = document.createElement("input");

	card.appendChild(moduleFirstName);
	moduleFirstName.appendChild(img);
	moduleFirstName.appendChild(input);

	// Добавляем классы
	moduleFirstName.classList.add("module");
	img.classList.add("photo");
	input.classList.add("text");

	// Клонируем секцию Имени с классами
	var moduleLastName = moduleFirstName.cloneNode(true);
	card.appendChild(moduleLastName);

	// Создаем секцию для Занятия
	var moduleOccupation = document.createElement("div");
	var select = document.createElement("select");

	// Опции Селекта формируем из перечня свойств объекта "occupationsDB"
	for (var key in occupationsDB) {
		var option = document.createElement("option");
		option.setAttribute("value", key);
		option.innerHTML = occupationsDB[key];
		select.appendChild(option);
	}

	moduleOccupation.appendChild(select);
	card.appendChild(moduleOccupation);

	// Добавляем классы
	moduleOccupation.classList.add("module");
	moduleOccupation.classList.add("moduleOccupation");
	select.classList.add("selectOccupation");
}

var sourceDB;

function workerCheckboxManager() {
	var occupationName = occupationsDB.worker.toLowerCase();
	if (workerCheckbox.checked) {
		sourceDB = workersDB;
		addCards();
	} else {
		removeCards(occupationName);
	}
}

function studentCheckboxManager() {
	var occupationName = occupationsDB.student.toLowerCase();
	if (studentCheckbox.checked) {
		sourceDB = studentsDB;
		addCards();
	} else {
		removeCards(occupationName);
	}
}

function housewifeCheckboxManager() {
	var occupationName = occupationsDB.housewife.toLowerCase();
	if (housewifeCheckbox.checked) {
		sourceDB = housewivesDB;
		addCards();
	} else{
		removeCards(occupationName);
	}
}

function addCards() {
	
	for(var key in sourceDB) {

		createGenericCard();

		// Подтягиваем в карточку Имя из объекта (БД). В массиве ищем с конца, чтоб не перезаписывались уже созданные карточки
		var firstName = document.getElementsByClassName("text")[document.getElementsByClassName("text").length-1-1];
		firstName.value = sourceDB[key].firstName;
		// Делаем поле Имя readonly
		firstName.setAttribute("readonly", "true");

		// Подтягиваем в карточку Фамилию из объекта (БД)
		var lastName = document.getElementsByClassName("text")[document.getElementsByClassName("text").length-1];
		lastName.value = sourceDB[key].lastName;

		// Подгружаем в карточку фото
		var photoFirstName = document.getElementsByClassName("photo")[document.getElementsByClassName("photo").length-1-1];
		var photoLastName = document.getElementsByClassName("photo")[document.getElementsByClassName("photo").length-1];
		photoFirstName.setAttribute("src", sourceDB[key].photo);
		photoLastName.setAttribute("src", sourceDB[key].photo);

		// Устанавливаем селектор Занятие в соответствующее положение (инфо в объекте)
		var selectOccupation = document.getElementsByClassName("selectOccupation")[document.getElementsByClassName("selectOccupation").length-1];
		for (var i = 0; i < selectOccupation.children.length; i++ ) {
			if(selectOccupation.children[i].getAttribute("value") === sourceDB[key].occupation.toLowerCase()) {
				selectOccupation.children[i].setAttribute("selected", "true");
			}
		}
	}
}

function removeCards(occupationName) {

	var occupationToRemoveArray = document.getElementsByClassName("selectOccupation");

	// Поиск по всем Селектам
	for(var i = 0; i < occupationToRemoveArray.length; i++) {
		// Поиск по Опшенам выбранных Селектов
		for(var j = 0; j < occupationToRemoveArray[i].children.length; j++) {
			// Проверка, стоит ли аттрибут Selected на Опшене с нужным Занятием 
			if((occupationToRemoveArray[i].children[j].getAttribute("value") === occupationName)&&
				(occupationToRemoveArray[i].children[j].getAttribute("selected") === "true")) {
				// От найденного элемента поднимаемся на 3-й уровень родителя (карточка) и удаляем ее
				occupationToRemoveArray[i].children[j].parentNode.parentNode.parentNode.remove();
				// Поскольку DOM изменился, запускаем рекурсию
				return removeCards(occupationName);
			}
		}
	}
}


