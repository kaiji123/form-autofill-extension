
console.log("Content script is running");





  // content.js
var inputFields = [];
// Detect input fields on the web page.




var suggestionList =null;
// Function to display autocomplete suggestions on the web page.
// Function to display autocomplete suggestions in the top left corner of the browser window.
function displayAutocompleteSuggestions(inputElement, suggestions) {
    // Create the suggestion list
    suggestionList = document.createElement('ul');
    suggestionList.classList.add('suggestion-list');
    if (suggestions == undefined){
        document.body.appendChild(suggestionList);
        return
    }
    suggestions.forEach((suggestion) => {
      const suggestionItem = document.createElement('li');
      suggestionItem.textContent = suggestion;
    
      suggestionItem.addEventListener('click', () => {
        inputElement.value = suggestion;
        suggestionList.innerHTML = '';
      });
    
      // Apply styles to the suggestion items for interaction
      suggestionItem.style.cursor = 'pointer';
      suggestionItem.style.padding = '8px';
      suggestionItem.style.transition = 'background-color 0.2s';
    
      suggestionItem.addEventListener('mouseover', () => {
        suggestionItem.style.backgroundColor = 'lightgray';
      });
    
      suggestionItem.addEventListener('mouseout', () => {
        suggestionItem.style.backgroundColor = 'transparent';
      });
    
      suggestionList.appendChild(suggestionItem);
    });
    
    // Apply styles for fixed positioning in the top left corner
    suggestionList.style.position = 'fixed';
    suggestionList.style.top = '10px';
    suggestionList.style.left = '10px';
    suggestionList.style.zIndex = '9999';
    suggestionList.style.backgroundColor = 'white'; // Set background color
    suggestionList.style.border = '1px solid #ccc'; // Add a border
    suggestionList.style.borderRadius = '5px'; // Rounded corners
    suggestionList.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)'; // Box shadow for a raised effect
    
    // Append the suggestion list to the document
    document.body.appendChild(suggestionList);
  }
  

// Function to get suggestions (replace with your own suggestion logic).
// function getSuggestions(inputText) {

//     var suggestions = [];
//   // This is a simplified example; replace with your own suggestion logic.
//   chrome.storage.local.get(['fullName', 'email', 'phone', 'linkedin', 'github', 'address', 'city', 'postcode'], function(result) {
   
//     if (chrome.runtime.lastError) {}
//     else{
//         suggestions.push(result.fullName);
//         suggestions.push(result.email);
//         suggestions.push(result.phone);
//         suggestions.push(result.linkedin);
//         suggestions.push(result.github);
//         suggestions.push(result.address);
//         suggestions.push(result.city);
//         suggestions.push(result.postcode);
//     }
  
  
//     // Now, suggestions contains the values from chrome.storage
//     console.log(suggestions);
//     console.log("getting suggestion")
//     console.log(suggestions.filter(suggestion => suggestion.includes(inputText)));
//     suggestions.filter(suggestion => suggestion.includes(inputText));
//   });
//   return suggestions

// }
function getSuggestions(inputText, callback) {
    // This is a simplified example; replace with your own suggestion logic.
    chrome.storage.local.get(['fullName', 'email', 'phone', 'linkedin', 'github', 'address', 'city', 'postcode'], function(result) {
      var suggestions = [];
      if (!chrome.runtime.lastError) {
        suggestions.push(result.fullName);
        suggestions.push(result.email);
        suggestions.push(result.phone);
        suggestions.push(result.linkedin);
        suggestions.push(result.github);
        suggestions.push(result.address);
        suggestions.push(result.city);
        suggestions.push(result.postcode);
      }
  
      // Now, suggestions contains the values from chrome.storage
      console.log(suggestions);
      console.log("getting suggestion");
      var filteredSuggestions = suggestions.filter(suggestion => suggestion.includes(inputText));
      callback(filteredSuggestions); // Call the callback with the filtered suggestions.
    });
  }




function autofill(inputFields) {
    console.log("autofilling");
    console.log(inputFields);
    chrome.storage.local.get(['fullName', 'email', 'phone', 'linkedin','github', 'address', 'city', 'postcode'], function(result) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            const fullName = result.fullName;
            const email = result.email;
            const phone = result.phone;
            const github = result.github
            const address = result.address
            const postcode = result.postcode
            const city = result.city
            const firstname = result.firstname
            const lastname = result.lastname
            const linkedin = result.linkedin
            inputFields.forEach(inputField => {
                const name = inputField.getAttribute('name');
                

                if (name && (name.toLowerCase().includes('name') )) {
                    inputField.value = fullName;
                }
                if (name && (name.toLowerCase().includes('first name') )) {
                    inputField.value = firstname;
                }
                if (name && (name.toLowerCase().includes('last name') || (name.toLowerCase().includes('surname') ) )) {
                    inputField.value = lastname;
                }

                if (name && (name.toLowerCase().includes('email'))) {
                    inputField.value = email;
                }

                if (name && (name.toLowerCase().includes('phone'))) {
                    inputField.value = phone;
                }

                if (name && (name.toLowerCase().includes('url'))) {
                    inputField.value = github;
                }
                const label = document.querySelector(`label[for="${inputField.id}"]`);



                if (label) {
                    console.log("label " +label.textContent);

                    if (label.textContent.toLowerCase().includes("phone")|| label.textContent.toLowerCase().includes("mobile")){
                        inputField.value = phone
                    }
                    
                    if (label.textContent.toLowerCase().includes("name")){
                        inputField.value = fullName
                    }
                    if (label.textContent.toLowerCase().includes("first name")){
                        inputField.value = firstname
                    }
                    if (label.textContent.toLowerCase().includes("last name")||label.textContent.toLowerCase().includes("surname")){
                        inputField.value = lastname
                    }
                    if (label.textContent.toLowerCase().includes("github")){
                        inputField.value = github
                    }
                    if (label.textContent.toLowerCase().includes("linkedin")){
                        inputField.value = linkedin
                    }



                    if (label.textContent.toLowerCase().includes("address")){
                        inputField.value = address
                    }

                    if (label.textContent.toLowerCase().includes("email")){
                        inputField.value = email
                    }



                    if (label.textContent.toLowerCase().includes("post")){
                        inputField.value = postcode
                    }
                    if (label.textContent.toLowerCase().includes("city")){
                        inputField.value = city
                    }
                    // Add similar logic for other fields
                    console.log("Autofilling done");
                } else {
                    console.log("No label found for inputField:", inputField.id);
                }
                
                // Add similar logic for other fields

                console.log("Autofilling done"); // Add this log
            });
        }
    });
}


// // mutation makes the each listener use autofill function, this will make it very laggy

// const emailInputObserver = new MutationObserver(() => {
//     console.log(inputFields)
//     const newinputs = document.querySelectorAll('input');
//     if (inputFields.length < newinputs.length){
//         console.log("changing inputs")
//         inputFields = newinputs
//         console.log(inputFields.length)

//         autofill(inputFields);
//                 // Attach event listeners to input fields for autocomplete.
//         inputFields.forEach(inputField => {
//         inputField.addEventListener('input', function () {
//             if (suggestionList != null){
//                 console.log("deleting", suggestionList);
//                 document.body.removeChild(suggestionList)
//             }

//             const inputText = inputField.value;
//             const suggestions = getSuggestions(inputText);
//             displayAutocompleteSuggestions(inputField, suggestions);
//             console.log("typing")
//         });
//         console.log("added")
//     });
//     }




//     });
    
// emailInputObserver.observe(document.body, { childList: true, subtree: true });


window.addEventListener("load", function () {
    console.log("loading");
    
    setTimeout(function () {
        console.log(inputFields)
        const newinputs = document.querySelectorAll('input');
        if (inputFields.length < newinputs.length){
            console.log("changing inputs")
            inputFields = newinputs
            console.log(inputFields.length)
    
            autofill(inputFields);
                    // Attach event listeners to input fields for autocomplete.
            inputFields.forEach(inputField => {
            inputField.addEventListener('input', function () {
                if (suggestionList) {
                    console.log("deleting", suggestionList);
                    if (suggestionList.parentNode) {
                        suggestionList.parentNode.removeChild(suggestionList);
                    }
                }
    
                const inputText = inputField.value;
                getSuggestions(inputText, function(suggestions) {
                    const suggestionList = suggestions;
                    console.log("GOTTEN suggestions")
                    console.log(suggestionList); // Do something with the suggestionList here.
                    displayAutocompleteSuggestions(inputField, suggestions);
                });
              
          
                console.log("typing")
            });
            console.log("added")
        });
        }
    
    
    
    }, 800);
});

