<script>
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signupContainer = document.getElementById('signupContainer');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        // Perform login action here, e.g., send request to server
        console.log('Login:', username, password);
    });

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        // Perform signup action here, e.g., send request to server
        console.log('Sign Up:', newUsername, newPassword);
    });

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        signupContainer.style.display = 'none';
        loginForm.style.display = 'block';
    });

    signupLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        signupContainer.style.display = 'block';
    });
</script>