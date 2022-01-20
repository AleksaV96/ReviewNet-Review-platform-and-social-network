package reviewnet.platform.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.security.AuthProvider;
import reviewnet.platform.domain.security.PasswordChangeAttempt;
import reviewnet.platform.domain.security.Permission;
import reviewnet.platform.domain.user.User;
import reviewnet.platform.dto.UserViewDTO;
import reviewnet.platform.repository.user.UserRepository;
import reviewnet.platform.service.security.PermissionService;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

@Service
public class UserAccService {
	
	@Autowired 
	UserRepository userAccRepository;
	
	@Autowired
    PermissionService permissionService;
	
	@Autowired
	ReviewElementService elementService;

    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Autowired
    ModelMapper modelMapper;
    
    @Autowired
    private MongoTemplate mongoTemplate;

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
            userAccRepository.save(user);
            permissionService.addSubscriberPermission(user.getPermission(), user.getId());
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
            userAccRepository.save(user);
            permissionService.addModeratorPermission(user.getPermission(), user.getId());
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
            userAccRepository.save(user);
            permissionService.addAdminPermission(user.getPermission(), user.getId());
            userAccRepository.save(user);
            return HttpStatus.CREATED;
        }
    }
	
	public void logicDeleteUser(String id) {
		 Optional<User> user = userAccRepository.findById(id);
		 user.get().setLogicDelete(true);
		 userAccRepository.save(user.get());
	}
	
	public void restoreUser(String id) {
		 Optional<User> user = userAccRepository.findById(id);
		 user.get().setLogicDelete(false);
		 userAccRepository.save(user.get());
	}
	
	public void setActiveStatus(String id, boolean status) {
		 Optional<User> user = userAccRepository.findById(id);
		 user.get().setLogicDelete(status);
		 userAccRepository.save(user.get());
	}
	
	public void removeUser(String id) {
		Query query = new Query();
		Query query2 = new Query();
		Query query3 = new Query();
		Query query4 = new Query();
        Optional<User> user = userAccRepository.findById(id);
        if(user.isPresent()) {
        	query.addCriteria(Criteria.where("subscribers").in(id));
        	List<ReviewElement> elements= mongoTemplate.find(query, ReviewElement.class);
        	for(ReviewElement element : elements){
        		element.getSubscribers().remove(id);
        		elementService.addElement(element);
        	}
        	query2.addCriteria(Criteria.where("moderators").in(id));
        	List<ReviewElement> modElements= mongoTemplate.find(query2, ReviewElement.class);
        	for(ReviewElement element : modElements){
        		element.getModerators().remove(id);
        		elementService.addElement(element);
        	}
        	query3.addCriteria(Criteria.where("friends").in(id));
        	List<User> friends= mongoTemplate.find(query3, User.class);
        	for(User friend : friends){
        		friend.getFriends().remove(id);
        		userAccRepository.save(friend);
        	}
        	query4.addCriteria(Criteria.where("userId").is(user.get().getId()));
    		List<Permission> oldPermissions= mongoTemplate.find(query4, Permission.class);
            for(Permission permission : oldPermissions){
                permissionService.deletePermission(permission);
            }
        }
        userAccRepository.delete(user.get());
    }
	
	public HttpStatus updateUser(String id, User user) {
		Optional<User> usr = userAccRepository.findById(id);
		if(usr.isPresent()) {
			usr.get().setName(user.getName());
			usr.get().setSurname(user.getSurname());
			usr.get().setUsername(user.getUsername());
			usr.get().setEmail(user.getEmail());
			usr.get().setImgUrl(user.getImgUrl());
			userAccRepository.save(usr.get());
			return HttpStatus.ACCEPTED;
		}
		return HttpStatus.BAD_REQUEST;
	}
	
	public HttpStatus changePassword(String id, PasswordChangeAttempt password) {
		Optional<User> usr = userAccRepository.findById(id);
		if(usr.isPresent()) {
			if(passwordEncoder.matches(password.getOldPassword(), usr.get().getPassword())) {
				usr.get().setPassword(passwordEncoder.encode(password.getNewPassword()));
				userAccRepository.save(usr.get());
				return HttpStatus.ACCEPTED;
			}
			return HttpStatus.UNAUTHORIZED;
		}
		return HttpStatus.BAD_REQUEST;
	}
	
	public UserViewDTO convertToDto(User user) {
		UserViewDTO userViewDTO = modelMapper.map(user, UserViewDTO.class);
	    	return userViewDTO;
	}
}
