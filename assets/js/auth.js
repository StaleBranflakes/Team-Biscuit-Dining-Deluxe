// assets/js/auth.js

// This script mimics a database using the browser's LocalStorage.
// Data is saved to the browser, so it persists even if you refresh.

const DB_KEY = 'uncp_dining_users';
const SESSION_KEY = 'uncp_current_user';

// --- REGISTER FUNCTION ---
function registerUser(username, password, role) {
    let users = JSON.parse(localStorage.getItem(DB_KEY)) || [];

    const userExists = users.some(u => u.username === username);
    if (userExists) {
        alert("Username already taken!");
        return false;
    }

    // Save user with their selected role
    users.push({ 
        username: username, 
        password: password,
        role: role // 'admin' or 'base'
    });
    
    localStorage.setItem(DB_KEY, JSON.stringify(users));
    alert("Registration successful! Please login.");
    window.location.href = 'Login.html';
    return true;
}

// --- LOGIN FUNCTION ---
function loginUser(username, password) {
    let users = JSON.parse(localStorage.getItem(DB_KEY)) || [];

    const validUser = users.find(u => u.username === username && u.password === password);

    if (validUser) {
        // Save the current session
        localStorage.setItem(SESSION_KEY, JSON.stringify(validUser));
        alert("Login successful! Welcome, " + validUser.username + " (" + (validUser.role || 'base') + ")");
        window.location.href = 'Map.html';
        return true;
    } else {
        alert("Invalid username or password.");
        return false;
    }
}

// --- LOGOUT FUNCTION ---
function logoutUser() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'Home.html'; 
}

// --- GET CURRENT USER ---
function getCurrentUser() {
    const userStr = localStorage.getItem(SESSION_KEY);
    return userStr ? JSON.parse(userStr) : null;
}
