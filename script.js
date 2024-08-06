const notesContainer = document.querySelector(".notes-container");
const createBtn = document.getElementById("create-notes-btn");
const searchBtn = document.getElementById("search-notes-btn");
const saveBtn = document.getElementById("save-notes-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
    notes = document.querySelectorAll(".input-box");
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "file:///C:/Users/krish/OneDrive/Desktop/images/delete.png";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    updateStorage();
    notes = document.querySelectorAll(".input-box");
});

notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
        notes = document.querySelectorAll(".input-box");
    } else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    function updateDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        document.getElementById('datetime').innerText = `${date} ${time}`;
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second

    showNotes(); // Load notes from localStorage
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

searchBtn.addEventListener("click", () => {
    const searchTerm = prompt("Enter the term to search in notes:");
    if (searchTerm !== null) {
        notes.forEach(note => {
            const noteText = note.innerText.toLowerCase();
            if (noteText.includes(searchTerm.toLowerCase())) {
                note.style.backgroundColor = "yellow";
            } else {
                note.style.backgroundColor = "white";
            }
        });
    }
});

saveBtn.addEventListener("click", () => {
    const notesText = Array.from(notes).map(note => {
        const timestamp = new Date().toLocaleString();
        return `${timestamp}\n${note.innerText}`;
    }).join("\n\n");
    const fileName = prompt("Enter the file name to save the notes:", "notes.txt");
    if (fileName) {
        const blob = new Blob([notesText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});

deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all notes?")) {
        notesContainer.innerHTML = "";
        updateStorage();
        notes = document.querySelectorAll(".input-box");
    }
});
