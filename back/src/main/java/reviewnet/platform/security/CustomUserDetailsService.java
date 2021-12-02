package reviewnet.platform.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import reviewnet.platform.domain.user.User;
import reviewnet.platform.exception.ResourceNotFoundException;
import reviewnet.platform.repository.user.UserRepository;
import reviewnet.platform.utils.UserPrincipal;

@Service
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User with username: " + username + " not found!"));

        return UserPrincipal.create(user);
    }
	
	@Transactional
    public UserDetails loadUserById(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        System.out.println("id");
        return UserPrincipal.create(user);
    }
	
}
