export function loginUser(credentials){
    alert('Login action dispatched with: \n' + credentials.username + ' : ' + credentials.password);
    return true;
}