import { auth } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Check if user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (window.location.pathname.includes("login.html")) {
            window.location.href = "index.html"; // Redirect to dashboard after login
        }
    } else {
        if (!window.location.pathname.includes("login.html") && !window.location.pathname.includes("signup.html")) {
            window.location.href = "login.html"; // Redirect to login if not authenticated
        }
    }
});

// Login form handling
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "index.html"; // Redirect to dashboard after login
        } catch (error) {
            document.getElementById("error-message").innerText = "Invalid credentials";
        }
    });
}

// Signup form handling
const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            window.location.href = "index.html"; // Redirect to dashboard after successful signup
        } catch (error) {
            document.getElementById("signup-error-message").innerText = "Error creating account: " + error.message;
        }
    });
}

// Forgot Password functionality (✅ Updated: Takes email from form)
const forgotPasswordLink = document.getElementById("forgot-password");
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;

        if (!email) {
            document.getElementById("error-message").innerText = "Please enter your email first.";
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            document.getElementById("error-message").innerText = "Password reset email sent!";
        } catch (error) {
            document.getElementById("error-message").innerText = "Error: " + error.message;
        }
    });
}

// Logout function
const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "login.html";
        });
    });
}
