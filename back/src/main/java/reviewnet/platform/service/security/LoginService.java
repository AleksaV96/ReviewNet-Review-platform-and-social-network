package reviewnet.platform.service.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import reviewnet.platform.domain.security.LoginAttempt;
import reviewnet.platform.payload.AuthResponse;
import reviewnet.platform.utils.TokenProvider;

import javax.validation.Valid;

@Service
public class LoginService {
	
	@Autowired 
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private TokenProvider tokenProvider;

	
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginAttempt loginAttempt) {
		Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginAttempt.getUsername(),
                        loginAttempt.getPassword()
                )
		);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));
	}


}
