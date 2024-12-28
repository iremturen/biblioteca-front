const loginButton = document.getElementById('login_button');
const register = document.getElementById('register');

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
               window.location.href = 'homepage.html';
           } else {
               alert('Invalid credentials');
           }
       } catch (error) {
           console.error('Error during login:', error);
           alert('An error occurred. Please try again.');
       }
   } else {
       alert('Please enter both username and password.');
   }
});


register.addEventListener('click', () => {
    window.location.href = 'register.html';
});
