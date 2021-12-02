package reviewnet.platform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import reviewnet.platform.domain.security.LoginAttempt;
import reviewnet.platform.service.security.LoginService;


@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping(value = "")
    public ResponseEntity<?> login(@RequestBody LoginAttempt loginAttempt) {
        return loginService.authenticateUser(loginAttempt);
    }


}
