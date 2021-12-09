package reviewnet.platform.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import reviewnet.platform.domain.security.AuthProvider;
import reviewnet.platform.domain.user.User;
import reviewnet.platform.dto.UserViewDTO;
import reviewnet.platform.repository.user.UserRepository;
import reviewnet.platform.service.security.PermissionService;

@Service
public class UserAccService {
	
	@Autowired 
	UserRepository userAccRepository;
	
	@Autowired
    PermissionService permissionService;

    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Autowired
    ModelMapper modelMapper;

	public Iterable<User> getAll() {
        return userAccRepository.findAll();
    }
	
	public Optional<User> getById(String id) {
        return userAccRepository.findById(id);
    }
	
	public Optional<User> findByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = userAccRepository.findByUsername(username);
		if(user==null) {
			throw new UsernameNotFoundException("User with username: " + username + " not found!");
		}
		return user;
    }
	
	public void addUser(User user) {
        userAccRepository.save(user);
    }
	
	
	public HttpStatus addSubscriber(User user) {

        Optional<User> accountData = userAccRepository.findByUsername(user.getUsername());
        if (accountData.isPresent()) {
            return HttpStatus.IM_USED;
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setProvider(AuthProvider.local);
            
            permissionService.addSubscriberPermission(user.getPermission());
            userAccRepository.save(user);
            return HttpStatus.CREATED;
        }
    }
	
	public HttpStatus addModerator(User user) {

        Optional<User> accountData = userAccRepository.findByUsername(user.getUsername());
        if (accountData.isPresent()) {
            return HttpStatus.IM_USED;
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setProvider(AuthProvider.local);
            
            permissionService.addModeratorPermission(user.getPermission());
            userAccRepository.save(user);
            return HttpStatus.CREATED;
        }
    }
	
	public HttpStatus addAdmin(User user) {

        Optional<User> accountData = userAccRepository.findByUsername(user.getUsername());
        if (accountData.isPresent()) {
            return HttpStatus.IM_USED;
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setProvider(AuthProvider.local);
            
            permissionService.addAdminPermission(user.getPermission());
            userAccRepository.save(user);
            return HttpStatus.CREATED;
        }
    }
	
	public void logicDeleteUser(String id) {
		 Optional<User> user = userAccRepository.findById(id);
		 user.get().setLogicDelete(true);
		 updateUser(id, user.get());
	}
	
	public void restoreUser(String id) {
		 Optional<User> user = userAccRepository.findById(id);
		 user.get().setLogicDelete(false);
		 updateUser(id, user.get());
	}
	
	public void removeUser(String id) {
        Optional<User> user = userAccRepository.findById(id);
        userAccRepository.delete(user.get());
    }
	
	public void updateUser(String id, User user) {
		Optional<User> usr = userAccRepository.findById(id);
		if(usr.isPresent()) {
			user.setId(usr.get().getId());
			userAccRepository.save(user);
		}
	}
	
	public UserViewDTO convertToDto(User user) {
		UserViewDTO userViewDTO = modelMapper.map(user, UserViewDTO.class);
	    	return userViewDTO;
	}
}
