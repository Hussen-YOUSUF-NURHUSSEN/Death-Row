



// ++ -------------------------------------------------------------------------------------------------------------------------------------------------

// @-- SwitchRight



// --- Select all right switches
let switchRightList = document.querySelectorAll(".page .right");


switchRightList.forEach((right) => {

    right.addEventListener("click", (e) => {

        // Third father from target
        if (e.target.parentElement.parentElement.parentElement.classList.contains("hispanic_page")) {

            nextSlide(".hispanic_page");
        }
        else if (e.target.parentElement.parentElement.parentElement.classList.contains("afro_page")) {

            nextSlide(".afro_page");
        }
        else if (e.target.parentElement.parentElement.parentElement.classList.contains("white_page")) {

            nextSlide(".white_page");
        }
    })
})


// ++ -------------------------------------------------------------------------------------------------------------------------------------------------

// @-- Function ====> go to right 


// Function to add more 6 person
// raceClass ===> for html to display data & for python to query database
function nextSlide(raceClass) {

    //  it is better to connect the number of slide to request from python ===> with currentSlideNumber multiply by 6


    // Get current & total slides 
    let currentSlide = document.querySelector(`${raceClass} .slide_number > span`);
    let totaltSlide  = document.querySelector(`${raceClass} .slide_number span:last-child`).innerHTML ;


    // --- Store to make request with python 
    let slideRequest = parseInt(currentSlide.innerHTML) * 6;

    // Increment number of current slides in html
    currentSlide.innerHTML = parseInt(currentSlide.innerHTML) + 1;

    
    // -- -------------------------------------------------------------------------------

    // Clear the other side switch states ====> (allow asking for previous slide)
    document.querySelector(`${raceClass} .left`).classList.remove("limit_reached");
    document.querySelector(`${raceClass} .left_slide .msg`).classList.remove("openMsg");

    // -- -------------------------------------------------------------------------------

    // --- Disable the event to (prevent switching to right)
    if (currentSlide.innerHTML === totaltSlide) {

        // Red color
        document.querySelector(`${raceClass} .right`).classList.add("limit_reached");
        document.querySelector(`${raceClass} .right_slide .msg`).innerHTML = "The end";
        document.querySelector(`${raceClass} .right_slide .msg`).classList.add("openMsg");

        // To have z-index on top of boxs ===> so msg can apear
        document.querySelector(`${raceClass} .right_slide`).addEventListener("mouseover", ()=> {

            // Let the switches be on top of boxs
            document.querySelector(` ${raceClass} .left_right_slide`).style.zIndex = "11";
        })
        document.querySelector(`${raceClass} .right_slide`).addEventListener("mouseout", ()=> {

            document.querySelector(` ${raceClass} .left_right_slide`).style.zIndex = "0";
        })
    }
    // -- -------------------------------------------------------------------------------

    let objData = {"slideNumber":slideRequest, "raceClass":raceClass, "requestDemande":"next"};

    // Call function which in turn if sucssesful we call other function =======> addPersonToHtml(raceClass, people);
    makeRequestAndDisplayHtml(objData, raceClass);

}

// ++ -------------------------------------------------------------------------------------------------------------------------------------------------

// @-- SwitchLeft


// --- Select all left switches
let switchLeft = document.querySelectorAll(".page .left");

switchLeft.forEach((left) => {

    left.addEventListener("click", (e) => {

        // Third father from target
        if (e.target.parentElement.parentElement.parentElement.classList.contains("hispanic_page")) {
            previousSlide(".hispanic_page");
        }
        else if (e.target.parentElement.parentElement.parentElement.classList.contains("afro_page")) {
            previousSlide(".afro_page");
        }
        else if (e.target.parentElement.parentElement.parentElement.classList.contains("white_page")) {
            previousSlide(".white_page");
        }
    })
})

// ++ -------------------------------------------------------------------------------------------------------------------------------------------------



// @-- Function ====> go to left 


function previousSlide(raceClass) {


    // Get current slide number
    let currentSlide = document.querySelector(`${raceClass} .slide_number > span`);

    // -- -------------------------------------------------------------------------------

    // --- Disable the event  ===> (prevent from going to left)
    if (currentSlide.innerHTML === "1") {

        // Red color
        document.querySelector(`${raceClass} .left`).classList.add("limit_reached");
        document.querySelector(`${raceClass} .left_slide .msg`).innerHTML = "The beginning";
        document.querySelector(`${raceClass} .left_slide .msg`).classList.add("openMsg");

        // To have z-index on top of boxs ===> so msg can apear
        document.querySelector(`${raceClass} .left_slide`).addEventListener("mouseover", ()=> {

            // Let the switches be on top of boxs
            document.querySelector(` ${raceClass} .left_right_slide`).style.zIndex = "11";
        })
        document.querySelector(`${raceClass} .left_slide`).addEventListener("mouseout", ()=> {

            document.querySelector(` ${raceClass} .left_right_slide`).style.zIndex = "0";
        })
    }

    // -- -------------------------------------------------------------------------------

    else {

        // Clear the other side switch states ====> (allow asking for next slide)
        document.querySelector(`${raceClass} .right`).classList.remove("limit_reached");
        document.querySelector(`${raceClass} .right_slide .msg`).classList.remove("openMsg");

        // -- -------------------------------------------------------------------------------

        // decrement number of current slides
        currentSlide.innerHTML = parseInt(currentSlide.innerHTML) - 1;

        // --- slide number to make request with python 
        let slideRequest = parseInt(currentSlide.innerHTML) * 6;

        let objData = {"slideNumber":slideRequest, "raceClass":raceClass, "requestDemande":"preivous"};

        // Call function which in turn if sucssesful we call other function =======> addPersonToHtml(raceClass, people);
        makeRequestAndDisplayHtml(objData, raceClass);
    }
}

// ++ -------------------------------------------------------------------------------------------------------------------------------------------------

// @-- Function Make request  

function makeRequestAndDisplayHtml(objData, raceClass) {

    let myPromie = new Promise(function(resolve, reject) {

        let xhr = new XMLHttpRequest();

        // -- -------------------------------------------------
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 ) {

                if (xhr.status == 200) {

                    // - Except array of 6 person
                    resolve(JSON.parse(xhr.response))
                }
                else {
                    reject("It sounds like it didn't work !")
                }
            }
        }
        // -- -------------------------------------------------

        let data = JSON.stringify(objData)

        xhr.open("POST", "/query_database");
        xhr.send(data)
    })
    // ---------------------------------------------------------------------------------
    myPromie
    // Array of 6 elemets ===> which are arrays of person info
    .then( (people) => {
        
        // Type of demande to slide the content to right or left
        let demande = objData["requestDemande"];

        // ++ addPersonToHtml();
        addPersonToHtml(raceClass, people, demande);
        
    })
    .catch( (err) => {console.log(err)} );
}

// ++ -------------------------------------------------------------------------------------------------------------------------------------------------


// @-- Function ===>  addPersonToHtml


//  Replace current boxs with 6 person
function addPersonToHtml(raceClass, people, demande) {

    // -- ---------------------------------------------------------------------------

    let parentBox = document.querySelector(`${raceClass} .parent_box`);

    if (demande == "next") {

        // --- Slide to right
        parentBox.style.transform = "translateX(104%)";
    }
    else {
        // --- Slide to left
        parentBox.style.transform = "translateX(-104%)";
    }
    

    // -- ---------------------------------------------------------------------------

    // Select all boxs bases on race
    let boxs = document.querySelectorAll(`${raceClass} .box`);

    // boxs[0].children) ======> HTMLCollection(7) [h3, h3, h3, h3, h3, h3, p]

    // Iterate over boxs to replace them, bases on people length
    for (let i = 0; i < people.length; i++) {
        
        // Loop one time for each box
        for (let j = 0; j <= 0; j++) {  

            boxs[i].children[0].innerHTML = `First Name : <span>${people[i][1]}</span>`
            boxs[i].children[1].innerHTML = `Last Name : <span>${people[i][2]}</span>`
            boxs[i].children[2].innerHTML = `Date of Birth : <span>${people[i][3]}</span>`
            boxs[i].children[3].innerHTML = `Education_level : <span>${people[i][4]}</span>`
            boxs[i].children[4].innerHTML = `Race : <span>${people[i][5]}</span>`
            boxs[i].children[5].innerHTML = `Native State : <span>${people[i][6]}</span>`
            boxs[i].children[6].innerHTML = `${people[i][11]}`
        }
    }

    // ----------------------------------------------------------------

    // Timeout ===> relative to transition time for ====> .page .parent_box
    
    // --- Slide (Hiddennly) 
    // setTimeout(()=> {

    //     parentBox.style.zIndex    = "-1";

    //     if (demande == "next") {
    //         // To left
    //         parentBox.style.transform = "translateX(-104%)";
    //     }
    //     else {
    //         // To right
    //         parentBox.style.transform = "translateX(104%)";
    //     }
        
        
    // }, 900)
    // // --- Display from right the new box
    // setTimeout(()=> {
    //     parentBox.style.zIndex    = "1";
    //     parentBox.style.transform = "translateX(0%)";
    // }, 1500)

    setTimeout(()=> {
        // parentBox.style.removeProperty("z-index")
        parentBox.style.removeProperty("transform")
    }, 900)
    
}

// ++ -------------------------------------------------------------------------------------------------------------------------------------------------



// @-- Function ===>  DisplayBox

let boxs = document.querySelectorAll(".box");
let clickedDiv;

boxs.forEach( (box) => {

    box.addEventListener("click", (e) => {

        // -- -------------------------------------------------------------------

        // Select the correct div even if inside elements are clicked
        if (e.target.parentElement.classList.contains("box")) {

            clickedDiv = e.target.parentElement;
        }
        else if (e.target.parentElement.parentElement.classList.contains("box")) {

            clickedDiv = e.target.parentElement.parentElement;
        }
        else {
            clickedDiv = e.target;
        }
        
        // -- -------------------------------------------------------------------

        let overlayBackground = document.createElement("div");
        let showBoxInfo       = document.createElement("div");

        overlayBackground.classList.add("overlay_background");
        showBoxInfo.classList.add("show_box_info");

        showBoxInfo.innerHTML = `
            <span class="close_botton">X</span>
            <h3> First Name      : <span>${clickedDiv.children[0].children[0].innerHTML}</span> </h3>
            <h3> Last  Name      : <span>${clickedDiv.children[1].children[0].innerHTML}</span> </h3>
            <h3> Date of Birth   : <span>${clickedDiv.children[2].children[0].innerHTML}</span> </h3>
            <h3> Education_level : <span>${clickedDiv.children[3].children[0].innerHTML}</span> </h3>
            <h3> Race            : <span>${clickedDiv.children[4].children[0].innerHTML}</span> </h3>
            <h3> Native State    : <span>${clickedDiv.children[5].children[0].innerHTML}</span> </h3>
            <h3> Last Statement  :- </h3>
            <p> "${clickedDiv.children[6].innerHTML}"</p>
        `
        // -- -------------------------------------------------------------------

        // Get the race to chose the right container
        let race = clickedDiv.querySelector(".race").children[0].innerHTML

        let currentPage;

        if (race === "Hispanic") {   

            currentPage = document.querySelector("#hispanic_container");
            overlayBackground.style.top = "0";
            showBoxInfo.style.top       = "50%";
        }
        else if (race === "Black") {    

            currentPage = document.querySelector("#afro_container");
            overlayBackground.style.top = "104%";
            showBoxInfo.style.top       = "155%";
        }
        else {
            currentPage = document.querySelector("#white_container");
            overlayBackground.style.top = "207%";
            showBoxInfo.style.top       = "260%";
        }

        // -- -------------------------------------------------------------------

        currentPage.appendChild(overlayBackground);
        currentPage.appendChild(showBoxInfo);

        // -- -------------------------------------------------------------------

        let closeBotton = document.querySelectorAll(".close_botton");

        closeBotton.forEach( (button) => {

            button.addEventListener("click", (e)=> {
                
                e.target.parentElement.parentElement.removeChild(overlayBackground);
                e.target.parentElement.parentElement.removeChild(showBoxInfo);
                
            })
        })
    })
})

// ++ -------------------------------------------------------------------------------------------------------------------------------------------------

