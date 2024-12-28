export class AuthManager {

    static checkToken() {
        const token = localStorage.getItem('authToken');
              
        if (!token) {
            this.redirectToLogin();
            return;
        }
    
        fetch('http://localhost:8080/api/validate_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                this.redirectToLogin();
            }
        })
        .catch(error => {
            console.error('Error during token validation:', error);
            this.redirectToLogin();
        });
    }

    static redirectToLogin() {
        localStorage.removeItem('authToken'); 
        window.location.href = 'login.html'; 
    }
}
