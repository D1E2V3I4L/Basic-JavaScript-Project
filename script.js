const inputBox = document.getElementById("input-box");
const listitem = document.getElementById("list-item");


function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

       
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.classList.add("edit-btn");
        li.appendChild(editButton);

        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        
        let priorityButton = document.createElement("button");
        priorityButton.innerHTML = "Priority";
        priorityButton.classList.add("priority-btn");
        li.appendChild(priorityButton);

        listitem.appendChild(li);
        li.classList.add("new-task"); 
        setTimeout(() => {
            li.classList.remove("new-task"); 
        }, 300);

        saveData();
    }
    inputBox.value = "";
}


listitem.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.classList.add("delete-task"); 
        e.target.parentElement.addEventListener('animationend', function () {
            e.target.parentElement.remove();
            saveData();
        });
    } else if (e.target.classList.contains("edit-btn")) {
        let li = e.target.parentElement;
        let newValue = prompt("Edit your task:", li.firstChild.nodeValue);
        if (newValue !== null && newValue.trim() !== '') {
            li.firstChild.nodeValue = newValue;
            saveData();
        }
    } else if (e.target.classList.contains("priority-btn")) {
        let li = e.target.parentElement;
        li.classList.toggle("priority");
        if (li.classList.contains("priority")) {
            li.innerHTML = `★ ${li.innerHTML}`;
        } else {
            li.innerHTML = li.innerHTML.replace('★ ', '');
        }
        saveData();
    }
}, false);


function saveData() {
    localStorage.setItem("data", listitem.innerHTML);
}


function showTask() {
    listitem.innerHTML = localStorage.getItem("data");
}


showTask();
