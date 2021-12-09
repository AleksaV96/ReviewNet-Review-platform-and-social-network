package reviewnet.platform.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.user.User;
import reviewnet.platform.domain.user.role.restriction.RestrictionType;
import reviewnet.platform.repository.user.UserRepository;
import reviewnet.platform.service.security.PermissionService;

@Service
public class UserFunctionsService {
	
	@Autowired
	UserRepository userFunctionsRepository;
	
	@Autowired
	UserAccService userAccService;
	
	@Autowired 
	PermissionService permissionService;
	
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
	
	public Optional<User> restrictUserFunction (String id, int option){
		Optional<User> user = userAccService.getById(id);
		if(user.isPresent()) {
		List<RestrictionType> restrictions = user.get().getPermission().getRoleDetails().getRestrictions();
		switch(option) {
		case 1:
			if(restrictions.contains(RestrictionType.ADD_NEW_ELEMENT))
				break;
			user.get().getPermission().getRoleDetails().getRestrictions().add(RestrictionType.ADD_NEW_ELEMENT);
			userAccService.updateUser(id, user.get());
			return user;
			
		case 2:
			if(restrictions.contains(RestrictionType.COMMENT)) 
				break;
			user.get().getPermission().getRoleDetails().getRestrictions().add(RestrictionType.COMMENT);
			userAccService.updateUser(id, user.get());
			return user;
			
		default:
			return Optional.empty();  
			}
		}
		return Optional.empty();
	}
	
	public Optional<User> removeUserRestriction (String id, int option){
		Optional<User> user = userAccService.getById(id);
		if(user.isPresent()) {
		switch(option) {
		case 1:
			user.get().getPermission().getRoleDetails().getRestrictions().remove(RestrictionType.ADD_NEW_ELEMENT);
			userAccService.updateUser(id, user.get());
			return user;
		case 2:
			user.get().getPermission().getRoleDetails().getRestrictions().remove(RestrictionType.COMMENT);
			userAccService.updateUser(id, user.get());
			return user;
		default:
			return Optional.empty();  
			}
		}
		return Optional.empty();
	}
	
	public Optional<User> updateUserRole(@PathVariable String id, @PathVariable String option){
		Optional<User> user = userAccService.getById(id);
		if(user.isPresent()) {
		switch(option) {
			case "subscriber":
				permissionService.addSubscriberPermission(user.get().getPermission());
				userAccService.updateUser(id, user.get());
				return user;
			case "moderator":
				permissionService.addModeratorPermission(user.get().getPermission());
				userAccService.updateUser(id, user.get());
				return user;
			case "admin":
				permissionService.addAdminPermission(user.get().getPermission());
				userAccService.updateUser(id, user.get());
				return user;
			default:
				return Optional.empty();
					}
			}
		return Optional.empty();
		}

	

}
