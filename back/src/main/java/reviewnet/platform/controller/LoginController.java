package reviewnet.platform.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import reviewnet.platform.domain.security.LoginAttempt;
import reviewnet.platform.service.security.LoginService;


@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody LoginAttempt loginAttempt) {
        return loginService.authenticateUser(loginAttempt);
    }
    
    @PostMapping(value = "/logout")
    public HttpStatus logout(HttpServletRequest request, HttpServletResponse response){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null)
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        return HttpStatus.OK;
    }

}
