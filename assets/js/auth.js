// assets/js/auth.js

// This script mimics a database using the browser's LocalStorage.
// Data is saved to the browser, so it persists even if you refresh.

const DB_KEY = 'uncp_dining_users';
const SESSION_KEY = 'uncp_current_user';

// --- REGISTER FUNCTION ---
function registerUser(username, password) {
    // 1. Get existing users or create empty list
    let users = JSON.parse(localStorage.getItem(DB_KEY)) || [];

    // 2. Check if username exists
    const userExists = users.some(u => u.username === username);
    if (userExists) {
        alert("Username already taken!");
        return false;
    }

    // 3. Add new user
    users.push({ username: username, password: password });
    
    // 4. Save back to LocalStorage
    localStorage.setItem(DB_KEY, JSON.stringify(users));
    alert("Registration successful! Please login.");
    window.location.href = 'Login.html'; // Redirect to login
    return true;
}

// --- LOGIN FUNCTION ---
function loginUser(username, password) {
    // 1. Get users
    let users = JSON.parse(localStorage.getItem(DB_KEY)) || [];

    // 2. Find matching user
    const validUser = users.find(u => u.username === username && u.password === password);

    if (validUser) {
        // 3. Set "Session"
        localStorage.setItem(SESSION_KEY, JSON.stringify(validUser));
        alert("Login successful!");
        window.location.href = 'Map.html'; // Redirect to Map
        return true;
    } else {
        alert("Invalid username or password.");
        return false;
    }
}

// --- LOGOUT FUNCTION (Optional, for your Home page) ---
function logoutUser() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'Login.html';
}

// --- CHECK IF LOGGED IN (Put this on Home.html) ---
function checkAuth() {
    const user = localStorage.getItem(SESSION_KEY);
    if (!user) {
        // window.location.href = 'Login.html'; // Uncomment to force login
    }
}
