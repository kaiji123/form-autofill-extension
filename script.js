

document.getElementById('jobApplicationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from actually submitting
  
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const city = document.getElementById('city').value;
    const postcode = document.getElementById('postcode').value;
    const address = document.getElementById('address').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    // const resumeFile = document.getElementById('resume').files[0];

  
    // Process the captured data (e.g., send it to a server, store it in storage, etc.)
  
    // Example: Log the data to the console
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Phone:', phone);



    chrome.storage.local.set({
        fullName,
        email,
        phone,
        linkedin,
        github,
        city,
        postcode,
        address,
        firstname,
        lastname
      }, function() {
        console.log('Data saved to Chrome Storage');
      });


  });
