package reviewnet.platform.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.user.User;
import reviewnet.platform.repository.user.UserRepository;

@Service
public class UserAccService {
	
	@Autowired 
	UserRepository userAccRepository;

	public Iterable<User> getAll() {
        return userAccRepository.findAll();
    }
	
	public Optional<User> getById(String id) {
        return userAccRepository.findById(id);
    }
	
	public Optional<User> findByUsername(String username) {
        return userAccRepository.findByUsername(username);
    }
	
	public void addUser(User user) {
        userAccRepository.save(user);
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
}
