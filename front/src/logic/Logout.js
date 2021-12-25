import { Navigate } from "react-router";

export function logout() {

    localStorage.clear();
    loginHandler();
    window.location.reload();
    
    function loginHandler() {
        
        fetch(
           'http://localhost:8080/auth/logout',
          {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        ).then((response) => {
            return response.json();
        })
        };
    return( <Navigate to="/login"/>)
    
}

export default logout;