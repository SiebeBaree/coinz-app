export function isLoggedIn() {
    let loggedIn = true;

    if (!sessionStorage.getItem('access_token')) loggedIn = false;
    if (!sessionStorage.getItem('user')) loggedIn = false;

    return loggedIn;
}