//variable declerations begin
let hamburgerIcons = document.getElementsByClassName("hamburger-controls");
let nav = document.getElementsByClassName("grey-background")[0];
let infoCards = document.getElementsByClassName("pledge-tier-info-wrapper")
let pledgeButtons = document.getElementsByClassName("pledge-button");
let pledgeStat = document.getElementsByClassName("pledge-stat")
let modal = document.getElementById("back-this-project-form-wrapper");
let modalCards = document.getElementsByClassName("modal-pledge-tier-info")
let modalPledgeStat = document.getElementsByClassName("modal-pledge-stat")
let modalContainer = document.getElementsByClassName("grey-background")[1];
let modalRadios = document.getElementsByClassName("modal-radio");
let modalRadioControls = document.getElementsByClassName("radio-control");
let modalTierTitles = document.getElementsByClassName("modal-pledge-tier-title");
let modalContinueButtons = document.getElementsByClassName("pledge-finish");
let modalPledgeDropdowns = document.getElementsByClassName("enter-your-pledge-wrapper");
let modalPledgeInputs = document.getElementsByClassName("pledge-amount");
let modalComplete = document.getElementById("thank-you");
let bambooStock = 101;
let blackEditionStock = 64;
let mahoganyStock = 0;
let inventory = [bambooStock, blackEditionStock, mahoganyStock];
let totalPledged = 89914;
let numberOfBackers = 5007;
console.log(modalPledgeStat)
//variable declerations end 

//function init runs when the document loads
function init() { 
    
    prepareHamburgerControls()
    preparePledgeButtons()
    prepareModalControls()
    checkInventory()
    prepareBookmarkButton()
    calculateTotalPledged(0)
    
}

function prepareHamburgerControls() {
    Array.from(hamburgerIcons).forEach(function(input,index){
        input.addEventListener("click", function () {
            if (index == 0) {
                input.style.display = "none"
                hamburgerIcons[1].style.display = "inline-block"
                nav.style.display = "block"
                return
            }
    
            input.style.display = "none"
            hamburgerIcons[0].style.display = "inline-block"
            nav.style.display = "none"
            return
        })
    })
}

function preparePledgeButtons(input, index) {
    Array.from(pledgeButtons).forEach(function(input, index){
        input.addEventListener("click", function () {

            modalContainer.style.display = "block"
            modal.style.display = "block"
            modalComplete.style.display = "none"
            modalRadios[index].checked = "true"
            openPledgeDropdowns()
            
        })
    })
   
}

function prepareModalControls() {
    
    prepareModalCloseControls()
    prepareGotItButton()
    prepareModalTitleInteractions()
    prepareModalRadioInteractions()
    preparePledgeSubmitButtons()
}


function prepareModalCloseControls(){
    let modalCloseButton = document.getElementById("close-modal-button")
    modalCloseButton.addEventListener("click", function () {
        modalContainer.style.display = "none"
    })
}

function prepareGotItButton(){ //got it button is the one that closes the thank you message
    let gotItButton = document.getElementsByClassName("got-it")[0]
    gotItButton.addEventListener("click", function () {
        modalContainer.style.display = "none"
    })
}

function prepareModalTitleInteractions(){
    Array.from(modalTierTitles).forEach(function (input, index) {
        if (index == 0){
            addModalTitleInteractionsEventListeners(input, index)
            return
        }
        
        if (inventory[index-1] > 0){
            addModalTitleInteractionsEventListeners(input,index)
        }
    })
}

function addModalTitleInteractionsEventListeners (modalTitle, index){
    modalTitle.addEventListener("mouseover", function () {
        modalRadioControls[index].style.border = "1px solid hsl(176, 50%, 47%)"
        modalTitle.style.color = "hsl(176, 50%, 47%)"
    })
    modalTitle.addEventListener("mouseout", function () {
        modalRadioControls[index].style.border = "1px solid rgba(100, 100, 111, 0.2)"
        modalTitle.style.color = "black"
    })
    modalTitle.addEventListener("click", function () {
        modalRadios[index].checked = "true"
        openPledgeDropdowns()
    })
}

function prepareModalRadioInteractions(){
    Array.from(modalRadios).forEach(function (input, index) {

        if (index == 0){
            addModalRadioInteractionsEventListeners(input,index)
            return
        }

        if (inventory[index-1] > 0){
           addModalRadioInteractionsEventListeners(input, index)
        }
        if (inventory[index-1] == 0){
            
            input.disabled = "true"
            
        }
    })
}

function addModalRadioInteractionsEventListeners(radioButton, index){
    radioButton.addEventListener("click", function () {
        openPledgeDropdowns()
        colorModalTierTitles()
    })

    radioButton.addEventListener("mouseover", function () {
        modalTierTitles[index].style.color = "hsl(176, 50%, 47%)"
        modalRadioControls[index].style.border = "1px solid hsl(176, 50%, 47%)"
    })
    radioButton.addEventListener("mouseout", function () {
        modalTierTitles[index].style.color = "black"
        modalRadioControls[index].style.border = "1px solid black"
    })
}

function openPledgeDropdowns() {

    Array.from(modalRadios).forEach(function (input, index) {

        modalPledgeDropdowns[index].style.display = "none"

        if (input.checked == true) {
            modalPledgeDropdowns[index].style.display = "block"
            return
        }


    })

}

function colorModalTierTitles() {
    Array.from(modalTierTitles).forEach(function (input, index) {
        input.style.display = "black"
        
        if (modalRadios[index].checked == true) {
            input.style.color = "hsl(176, 50%, 47%)"
            return
        }

    })

}
console.log(document.getElementsByClassName("enter-your-pledge-form"))
function preparePledgeSubmitButtons(){
    
    Array.from(modalContinueButtons).forEach(function (button,index) {
        button.addEventListener("click", function () {
            
            let amountPledged = modalPledgeInputs[index].value 
            if (validatePledge(index) == true){
                numberOfBackers++
                openThankYouCard()
                calculateTotalPledged(amountPledged)
                updateInventoryOnBackend(index)
                publishNumberOfBackers()
                
                document.getElementsByClassName("enter-your-pledge-form")[index].reset()

                
            }
        })
    })
}

function validatePledge(index){
    let amountPledged = parseInt(modalPledgeInputs[index].value)
    let pledgeMin = parseInt(document.getElementsByClassName("pledge-amount")[index].min) 
    errorMessage = document.getElementsByClassName("error-message")[index]

    if (amountPledged >= pledgeMin){
        removeErrorMessages(index)
        return true
    } 

    if (amountPledged < pledgeMin){
        printErrorMessages(amountPledged,index)
        return false
    }

}

function removeErrorMessages(index){
    errorMessage = document.getElementsByClassName("error-message")[index]
    modalPledgeInputs[index].style.border ="1px solid rgba(100, 100, 111, 0.2)"
    errorMessage.innerText = ""
}

function printErrorMessages(value,index){

    let pledgeMin = document.getElementsByClassName("pledge-amount")[index].min 
    errorMessage = document.getElementsByClassName("error-message")[index]
    modalPledgeInputs[index].style.border ="2px solid rgb(155, 27, 27)"
    
    if (value == ""){
       errorMessage.innerText = "Pledge not specified"
       return
    }

    if (value == 0){
        errorMessage.innerText = "Pledge cannot be 0"
        return
    }

    if (value < pledgeMin){
        errorMessage.innerText = "Minimum pledge is " + modalPledgeInputs[index].min +"$"
        return
    }
    

}

function openThankYouCard(){
    modal.style.display = "none"
    modalComplete.style.display = "block"
    modalContainer.style.height = "100%"
}

function updateInventoryOnBackend(index){
    if (index > 0){
        inventory[index-1] --
        checkInventory()
    }
}

function checkInventory() {
    inventory.forEach(function (stock, index) {
        updateInventoryOnFrontEnd(stock,index)
        if (stock == 0) {
            updateStylesBasedOnInventory(index)
        }
    })
}

function updateInventoryOnFrontEnd(stock,index){
    pledgeStat[index].innerText = stock;
    modalPledgeStat[index].innerText = stock;
}

function updateStylesBasedOnInventory(index){
        pledgeButtons[index + 1].innerText = "Out of Stock"
        infoCards[index].style.opacity = "0.5"
        modalRadioControls[index].disabled = "true"
        pledgeButtons[index+1].disabled = "true"
        pledgeButtons[index+1].style.backgroundColor ="grey"
        modalCards[index+1].style.opacity = "0.5"
    
}

function calculateTotalPledged(amountPledged){

    totalPledged = totalPledged + parseInt(amountPledged);
    let str = totalPledged.toString();
    let digits = str.split("");
    var printedAmount = "$"
    digits.forEach(function(input, index){
        if ((index+1)%3 == 0){
            printedAmount =  printedAmount + ","
        }
        printedAmount = printedAmount + input
    })
    document.getElementById("total-pledged").innerText = printedAmount
    updatePledgeStatusBar(totalPledged)
}

function updatePledgeStatusBar(total){
    let statusBar = document.getElementById("progress-bar-fill")
    let percentage,CSSpercentage;
    percentage = total/100000*100
    CSSpercentage = percentage.toString() + "%"
    statusBar.style.width = CSSpercentage
    if (percentage > 100){
        statusBar.style.width = "100%"
    }
}

var bookmarkState = 0;

function prepareBookmarkButton(){
    
    document.getElementById("bookmark-desktop").addEventListener("click",function(){
       
        if (bookmarkState == 0){
            document.getElementById("bookmark-span").style.color = "rgba(20, 123, 116)"
            document.getElementById("bookmark-span").style.marginLeft = "-22px"
            document.getElementById("bookmark-span").innerText = "Bookmarked"
            document.getElementById("bookmark-desktop").style.backgroundColor= "rgba(20, 123, 116, 0.1)"
            document.getElementById("bookmark-desktop").style.width= "180px"
            document.getElementById("bookmark-circle").style.fill = "rgba(20, 123, 116)"
            bookmarkState = 1
            return
        }

        if (bookmarkState == 1){
            document.getElementById("bookmark-span").style.color = "#3d3d3d"
            document.getElementById("bookmark-span").style.marginLeft = "-12px"
            document.getElementById("bookmark-span").innerText = "Bookmark"
            document.getElementById("bookmark-desktop").style.backgroundColor= "#dad8d8"
            document.getElementById("bookmark-desktop").style.width= "160px"
            document.getElementById("bookmark-circle").style.fill = "black"
            bookmarkState = 0
            return
        }
    })
}

function publishNumberOfBackers(){
    document.getElementById('number-of-backers').innerText = numberOfBackers
}
// due to the use of functions this one line of code sets off a cascade of functions that controls the whole web page.
document.addEventListener('DOMContentLoaded', init);