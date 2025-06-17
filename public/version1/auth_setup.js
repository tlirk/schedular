
//initialize message popUp 
const popup = document.querySelector('.msgPopUp');

//simulate server message after 2 seconds
setTimeout(()=>{
    showPopup('You have a new message!', 'error');
}, 2000)

function showPopup(message, msgStatus = 'success') {
    if(msgStatus !== 'success'){
        document.querySelector('.msg_status').innerHTML = 'Failure';
        document.querySelector('.msg_status').style.color ='red';

        document.querySelector('.msg_notify').innerHTML = message;
        popup.classList.add('show');
        //auto hide after 30 seconds
        setTimeout(() =>{
            hidePopup();
        },5000);

    }

    document.querySelector('.msg_status').innerHTML = 'success!';
    document.querySelector('.msg_status').style.color ='green';
    document.querySelector('.msg_notify').innerHTML = message;
    popup.classList.add('show');
    //auto hide after 30 seconds
    setTimeout(() =>{
        hidePopup();
    },15000);
    
}

//function to hide message popUp
function hidePopup() {
    popup.classList.remove('show');
    
}


//initialize login button

let signUpBtn = document.querySelector('#signupBtn');
/*
signUpBtn.addEventListener('click',async(e)=>{
    e.preventDefault();
    //alert('signupBtn pressed');
    //initialize register variables
    try {
        
    
        let rfirstName = document.querySelector('#rf_name').value;
        let rlastName = document.querySelector('#rl_name').value;
        let r_email = document.querySelector('#r_email').value;
        let rPhoneNumber = document.querySelector('#r_phoneNo').value;
        let rPassword = document.querySelector('#r_password').value;
        let rconfirmPassword = document.querySelector('#rc_password').value;

        if (rfirstName === '' && rlastName === '' && r_email === '' && rPhoneNumber === '' && rPassword === '' && rconfirmPassword === '') {
            alert("Please fill all field");        
        }

        if (rPassword !== rconfirmPassword) {
            alert("Your Passwords Do Not Match");
            rconfirmPassword.style.border = "2px solid red";
            
        }

        let user = {
            "rfirst_name": rfirstName,
            "rlast_name": rlastName,
            "r_email": r_email,
            "rPhoneNumber": rPhoneNumber,
            "rPassword": rPassword,
            "rconfirmPassword": rconfirmPassword
        }

        console.log(user);
        const url = 'http://localhost:3000/signup';
        
        //httpRequest('http://localhost:3000/signup','POST', user);
        
        const response = await fetch(url, {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json'
             },            
            body: JSON.stringify(user)
        });

        

        
        if (!response.ok) {   
            console.log(response.json());             
            showPopup("Email already in use or phone already in use",'error');
            throw new Error(`HTTP error! Status: ${response.status}`);
            
        }

        let data = await response.json();
        
        if(data.status == 'success' && data.message == "User Account Created Successfully"){
            showPopup("Account created Succesfully", 'success!')
            console.log("Server Data",data);
            rfirstName.value = '';
            rfirstName.innerHTML = '';
            rlastName.value = '';
            rlastName.innerHTML = '';
            rPhoneNumber.value = '';
            rPhoneNumber.innerHTML = '';
            r_email.value = '';
            r_email.innerHTML = '';
            rPassword.value = '';
            rPassword.innerHTML = '';
            rconfirmPassword.value = '';
            rconfirmPassword.innerHTML = '';

            setTimeout(() => {
                document.querySelector('.register').style.display = 'none';
                document.querySelector('.login').style.display = 'flex';                
            }, 10000);

        }
        
        
       

        
    } catch (error) {
        console.error("Register User Error:", error)
        
    }


})
*/

signUpBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        // Get form input values
        let rfirstName = document.querySelector('#rf_name').value;
        let rlastName = document.querySelector('#rl_name').value;
        let r_email = document.querySelector('#r_email').value;
        let rPhoneNumber = document.querySelector('#r_phoneNo').value;
        let rPassword = document.querySelector('#r_password').value;
        let rconfirmPassword = document.querySelector('#rc_password').value;

        // Basic client-side validation
        if (
            rfirstName === '' &&
            rlastName === '' &&
            r_email === '' &&
            rPhoneNumber === '' &&
            rPassword === '' &&
            rconfirmPassword === ''
        ) {
            showPopup("Please fill all fields", 'error');
            return;
        }

        if (rPassword !== rconfirmPassword) {
            showPopup("Your Passwords Do Not Match", 'error');
            document.querySelector('#rc_password').style.border = "2px solid red";
            return;
        }

        let user = {
            rfirst_name: rfirstName,
            rlast_name: rlastName,
            r_email: r_email,
            rPhoneNumber: rPhoneNumber,
            rPassword: rPassword,
            rconfirmPassword: rconfirmPassword
        };

        const url = 'http://localhost:3000/signup';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const responseData = await response.json(); // Always parse the response

        if (!response.ok) {
            // Show server validation errors
            if (responseData.errors && Array.isArray(responseData.errors)) {
                const errorMessages = responseData.errors.join('\n');
                console.error("Validation Errors:", responseData.errors);
                showPopup(errorMessages, 'error');
            } else {
                const fallbackMsg = responseData.message || 'Signup failed.';
                showPopup(fallbackMsg, 'error');
            }
            return; // Stop further execution
        }

        // Success case
        if (responseData.status === 'success' && responseData.message === "User Account Created Successfully") {
            showPopup("Account created successfully", 'success');

            // Clear form fields
            document.querySelector('#rf_name').value = '';
            document.querySelector('#rl_name').value = '';
            document.querySelector('#r_email').value = '';
            document.querySelector('#r_phoneNo').value = '';
            document.querySelector('#r_password').value = '';
            document.querySelector('#rc_password').value = '';

            setTimeout(() => {
                document.querySelector('.register').style.display = 'none';
                document.querySelector('.login').style.display = 'flex';
            }, 10000);
        }

    } catch (error) {
        // Catch fetch/network errors or unhandled exceptions
        console.error("Unexpected Error:", error);
        showPopup("An unexpected error occurred. Please try again later.", 'error');
    }
});



/*
 Makes an HTTP request using GET or POST method.
 
 @param {string} url - The endpoint URL.
 @param {string} method - The HTTP method: "GET" or "POST".
 @param {object} [body=null] - The request body for POST method.
 @returns {Promise<object>} - A promise resolving to the response data.
*/
async function httpRequest(url, method = 'GET', body = null) {
    method = method.toUpperCase();

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (method === 'POST' && body) {
        options.body = JSON.stringify(body);
    }

    if (method === 'GET' && body) {
        // Append query parameters for GET request
        const query = new URLSearchParams(body).toString();
        url += `?${query}`;
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const message = response.json();
            
            showPopup("Email already in use or phone already in use",'error');
            throw new Error(`HTTP error! Status: ${response.status}`);
            
        }

        let data = await response.json();
        showPopup("Account created Succesfully")
        console.log("Server Data",data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}