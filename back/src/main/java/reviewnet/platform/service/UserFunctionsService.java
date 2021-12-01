package reviewnet.platform.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.user.User;
import reviewnet.platform.repository.user.UserRepository;

@Service
public class UserFunctionsService {
	
	@Autowired
	UserRepository userFunctionsRepository;
	
	@Autowired
	UserAccService userAccService;
	
	public Optional<User> addFriend (String id, User friend){
		Optional<User> selectedUser = userAccService.getById(id);
		selectedUser.get().getFriends().add(friend.getId());
		userAccService.updateUser(id, selectedUser.get());
		return selectedUser;
	}
	
	public Optional<User> subscribe (String id, ReviewElement reviewElement){
		Optional<User> selectedUser = userAccService.getById(id);
		selectedUser.get().getSubscribed().add(reviewElement.getId());
		userAccService.updateUser(id, selectedUser.get());
		return selectedUser;
	}
	
}
