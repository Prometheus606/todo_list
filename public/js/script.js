const createButton = $(".create");
createButton.on("click", () => {
    openPrompt({})
})

const prompt = {
    isOpen: false
}

document.addEventListener("keydown", (event) => {
    let key = event.key
    if (key == "Enter" && !prompt.isOpen) {
        prompt.isOpen = true
        openPrompt({})
    } else if (key == "Escape" && prompt.isOpen) {
        closePrompt()
        prompt.isOpen = false
    }
})

function addTodo(newTodo) {
    fetch("/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: newTodo})
    })
    location.reload()
}

// delete todo if clicking on the todo checkbox
$(".remove-btn").on("click", function (event) {
    $(event.currentTarget).fadeOut()
    const id = event.currentTarget.id

    fetch("/", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id})
    })
    location.reload()
});

//update todo if clicking on the todo text
$(".list-item").on("click", function (event) {
    openPrompt({
        value: event.currentTarget.textContent,
        okButtonText: "Aktualisieren",
        action: "update",
        itemID: event.currentTarget.id
    })
});

function updateTodo(id, updatedTodo) {
    fetch("/", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, title: updatedTodo})
    })
    location.reload()
}

function openPrompt({value, okButtonText, action="add", itemID}) {
    // Erstelle das Overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Erstelle das Prompt-Fenster
    const promptContainer = document.createElement('div');
    promptContainer.className = 'prompt-container';
    
    // Erstelle das Eingabefeld
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'prompt-input';
    if (value) {
        input.value = value
    } else {
        input.placeholder = "Was möchtest du hinzufügen?";
    }

    // Erstelle den OK-Button
    const okButton = document.createElement('button');
    okButton.textContent = okButtonText ? okButtonText : 'Hinzufügen'
    okButton.className = 'prompt-button';
    okButton.onclick = () => {
        if (action === "add") {
            let newTodo = input.value;
            if (newTodo !== undefined && newTodo !== null && newTodo.length > 0) {
                closePrompt()
                prompt.isOpen = false
                addTodo(newTodo)
            }
        } else if (action = "update") {
            let updatedTodo = input.value;
            if (updatedTodo !== undefined && updatedTodo !== null && updatedTodo.length > 0) {
                closePrompt()
                prompt.isOpen = false
                updateTodo(itemID, updatedTodo)
            }
        }
        
    };

    // Erstelle den Abbrechen-Button
    const leaveButton = document.createElement('button');
    leaveButton.textContent = 'Abbrechen';
    leaveButton.className = 'prompt-button';
    leaveButton.onclick = () => {
        closePrompt();
    };

    // Füge alles zum Prompt-Fenster hinzu
    promptContainer.appendChild(input);
    promptContainer.appendChild(okButton);
    promptContainer.appendChild(leaveButton);

    // Füge das Prompt-Fenster zum Body hinzu
    document.body.appendChild(promptContainer);

    // Fokussiere das Eingabefeld
    input.focus();
    
}

function closePrompt() {
    // Entferne das Overlay und das Prompt-Fenster
    const overlay = document.querySelector('.overlay');
    const promptContainer = document.querySelector('.prompt-container');
    prompt.isOpen = false

    if (overlay && promptContainer) {
        document.body.removeChild(overlay);
        document.body.removeChild(promptContainer);
    }
}

