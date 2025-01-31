const loginButton = document.getElementById('login_button');
const register = document.getElementById('register');
const error_msg = document.getElementById('error_msg');

loginButton.addEventListener('click', async () => {
   const username = document.querySelector('input[name="username"]').value;
   const password = document.querySelector('input[name="password"]').value;
   
   if (username && password) {
       try {
           const response = await fetch('http://localhost:8080/api/login', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({ username, password })
           });

           const data = await response.json();
           if (response.ok) {
               localStorage.setItem('authToken', data.token);
               localStorage.setItem('userId', data.userId);
               localStorage.setItem('email', data.email);
               window.location.href = 'homepage.html';
           } else {
            console.error('Invalid credentials');
           }
       } catch (error) {
           console.error('Error during login:', error);
           error_msg.style.display = 'flex';
           error_msg.style.marginLeft='30px'
           error_msg.innerHTML = 'An error occurred. Please try again.';
       }
   } else {
     error_msg.style.display = 'flex';
     error_msg.innerHTML = 'Please enter both username and password.';
   }
});


register.addEventListener('click', () => {
    window.location.href = 'register.html';
});
