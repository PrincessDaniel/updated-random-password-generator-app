import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://password-kingdom-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const savedPasswords = ref(database, "passwordList")

const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const password = document.getElementById("password")
const firstPassword = document.getElementById("pass1")
const secondPassword = document.getElementById("pass2")
const savedPasswordList = document.getElementById("saved-password-list")
const clearPasswordBtnText = document.getElementById("clear")
const clearPasswordList = document.getElementById("clear-list")


password.addEventListener("click", function(){
    createPassword()
})

firstPassword.addEventListener("click", function() {
    savePassword1()
    console.log("hey")
})

secondPassword.addEventListener("click", function() {
    savePassword2()
    console.log("hi")
})

function createPassword() {
    firstPassword.textContent = ""
    secondPassword.textContent = ""
    for (let i = 0; i < 12; i++){
        let randomPassword1 = characters[Math.floor(Math.random() * characters.length)]
        let randomPassword2 = characters[Math.floor(Math.random() * characters.length)]
        firstPassword.textContent += randomPassword1
        secondPassword.textContent += randomPassword2
    }
}

function savePassword1() {
    let newPassword = firstPassword.textContent
    if (newPassword === "") {}
    else {
        push(savedPasswords, newPassword)
    }
}

function savePassword2() {
    let newPassword = secondPassword.textContent
    if (newPassword === "") {}
    else {
        push(savedPasswords, newPassword)
    }
}

onValue(savedPasswords, function(snapshot) {
    if (snapshot.exists()) {
        let passwordList = Object.entries(snapshot.val())
        refreshDisplayPasswordList()
        for (let i = 0; i < passwordList.length; i++) {
            let individualPasswordArray = passwordList[i]
            displayPasswordList(individualPasswordArray)
        }
    }
    else {
        savedPasswordList.innerHTML = ""
    }
})

function deleted() {
        console.log("nipple")
    }
    
function displayPasswordList (listItem) {
    let listItemID = listItem[0]
    let listItemValue = listItem[1]
    
    let listEl = document.createElement("li")
    listEl.textContent = listItemValue
    listEl.setAttribute("id", "list")
    
    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.setAttribute("id", "delete-btn")
    
    savedPasswordList.append(listEl, deleteBtn)
    
    
    deleteBtn.addEventListener("click", function() {
        let exactLocationOfListItem = ref(database, `passwordList/${listItemID}`)
        remove(exactLocationOfListItem)
    })
}

function refreshDisplayPasswordList() {
    savedPasswordList.innerHTML = ""
}

clearPasswordBtnText.addEventListener("click", function() {
    firstPassword.textContent = ""
    secondPassword.textContent = ""
})

clearPasswordList.addEventListener("click", function() {
    remove(savedPasswords)
})

