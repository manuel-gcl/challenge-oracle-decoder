const inputTextArea = document.querySelector(".input-text");
const outputTextArea = document.querySelector(".output-text");
const outputPlaceholder = document.querySelector(".output-placeholder");
const placeholderTextDiv = document.querySelector('.placeholder-text-div');

const encriptKeys = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

function replaceLetters(inpString, encript = true) {
    inpString = normaliceTxtInput(inpString);
    const keyIndex = encript ? 0 : 1;
    const valueIndex = encript ? 1 : 0;

    for (let i = 0; i < encriptKeys.length; i++) {
        let key = encriptKeys[i][keyIndex];
        let value = encriptKeys[i][valueIndex];
        if (inpString.includes(key)) {
            inpString = inpString.replaceAll(key, value);
        }
    }
    return inpString;
}

function normaliceTxtInput(inpString) {
    return inpString.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function encryptBtn() {
    const textAreaValue = inputTextArea.value;
    isValidInput(textAreaValue)
        ? showResults(replaceLetters(textAreaValue))
        : showAlert("No se ingreso texto a encriptar.");
}

function decryptBtn() {
    const textAreaValue = inputTextArea.value;
    isValidInput(textAreaValue)
        ? showResults(replaceLetters(textAreaValue, false))
        : showAlert("No se ingresó texto a desencriptar.");
}

function isValidInput(textValue) {
    return textValue.trim() != "";
}

function copyText() {
    const outputText = outputTextArea.value;
    if (outputText != "") {
        const textarea = document.createElement("textarea");
        textarea.value = outputText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }
}

function clearAllText() {
    outputTextArea.style.display = "none";
    outputTextArea.value = "";
    inputTextArea.value = "";

    outputPlaceholder.style.display = "flex";

    outputPlaceholder.style.display = (window.innerWidth < 1000) ? "row" : "column";
    restorePlaceholder();
}

function showResults(resMessage) {
    hidePlaceholder();
    outputTextArea.value = resMessage;
}

function hidePlaceholder() {
    const timeEffect = 1000;

    outputPlaceholder.classList.add('hidden-placeholder');
    placeholderTextDiv.classList.add('hidden-placeholder-text-div');
    setTimeout(() => {
        outputPlaceholder.style.display = "none";
        outputTextArea.style.display = "block";
    }, timeEffect);
}

function restorePlaceholder() {
    outputPlaceholder.classList.remove('hidden-placeholder');
    placeholderTextDiv.classList.remove('hidden-placeholder-text-div');
}

function showAlert(alertMessage) {
    if (!document.querySelector('.alertBox')) {
        const alertBox = document.createElement('div');
        alertBox.className = 'alertBox';
        alertBox.textContent = alertMessage;
        document.body.appendChild(alertBox);

        alertBox.addEventListener("click", () => alertBox.remove());
    }
}