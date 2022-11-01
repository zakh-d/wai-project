// Example 'ala' token based authentication. without call to real server
if (!sessionStorage.getItem('authToken')){
    sessionStorage.setItem('authToken', Date.now());
}

function isAuthenticated(){
    return sessionStorage.getItem('authToken') !== null;
}