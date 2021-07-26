let hamburgerIcons = document.getElementsByClassName("hamburger-controls");
let nav = document.getElementsByClassName("grey-background")[0];
let pledgeButtons = document.getElementsByClassName("pledge-button");
let pledgeStat = document.getElementsByClassName("pledge-stat")
let modal = document.getElementById("back-this-project-form-wrapper");
let modalPledgeStat = document.getElementsByClassName("modal-pledge-stat")
let modalContainer = document.getElementsByClassName("grey-background")[1];
let modalRadios = document.getElementsByClassName("modal-radio");
let modalRadioControls = document.getElementsByClassName("radio-control");
let modalTierTitles = document.getElementsByClassName("modal-pledge-tier-title");
let modalContinueButtons = document.getElementsByClassName("pledge-finish");
let modalPledgeDropdowns = document.getElementsByClassName("enter-your-pledge-wrapper");
let modalComplete = document.getElementById("thank-you");
let bambooStock = 101;
let blackEditionStock = 64;
let MahoganyStock = 0;
let inventory = [bambooStock, blackEditionStock, MahoganyStock];

function init() {
    prepareModalControls()
    Array.from(hamburgerIcons).forEach(prepareHamburgerControls)
    Array.from(pledgeButtons).forEach(preparePledgeButtons)
    checkInventory()
    modalRadioControls[3].disabled = "true"
    pledgeButtons[3].disabled = "true"
}

function checkInventory() {
    inventory.forEach(function (input, index) {

        pledgeStat[index].innerText = input;
        modalPledgeStat[index].innerHTML = input;

        if (input == 0) {
            pledgeButtons[index + 1].innerText = "Out of Stock"


        }
    })
}


function prepareHamburgerControls(input, index) {

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
}

function preparePledgeButtons(input, index) {
    const text = input.innerText
    input.addEventListener("click", function () {
        modalContainer.style.display = "block"
        modal.style.display = "block"
        modalComplete.style.display = "none"
        console.log(index)
        if (index > 0) {
            modalRadios[index].checked = "true"
        }
    })
}

function prepareModalControls() {
    let modalCloseButton = document.getElementById("close-modal-button")
    modalCloseButton.addEventListener("click", function () {
        modalContainer.style.display = "none"
    })
    let gotItButton = document.getElementsByClassName("got-it")[0]
    gotItButton.addEventListener("click", function () {
        modalContainer.style.display = "none"
    })

    Array.from(modalTierTitles).forEach(function (input, index) {
        input.addEventListener("mouseover", function () {
            modalRadioControls[index].style.border = "1px solid hsl(176, 50%, 47%)"
        })
        input.addEventListener("mouseout", function () {
            modalRadioControls[index].style.border = "1px solid rgba(100, 100, 111, 0.2)"
        })
        input.addEventListener("click", function () {
            modalRadios[index].checked = "true"
            openPledgeDropdowns()
        })

    })

    Array.from(modalRadios).forEach(function (input, index) {
        input.addEventListener("click", function () {
            openPledgeDropdowns()
            colorModalTierTitles()
        })

    })

    Array.from(modalContinueButtons).forEach(function (button) {
        button.addEventListener("click", function () {
            modal.style.display = "none"
            modalComplete.style.display = "block"
            modalContainer.style.height = "100%"
        })
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
document.addEventListener('DOMContentLoaded', init);