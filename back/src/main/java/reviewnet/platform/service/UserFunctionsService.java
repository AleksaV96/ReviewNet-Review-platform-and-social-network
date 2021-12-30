package reviewnet.platform.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.user.User;
import reviewnet.platform.domain.user.role.Moderator;
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
	
	@Autowired
	PostService postService;
	
	@Autowired
	ReviewElementService elementService;
	
	public Optional<User> addFriend (String id, String friendId){
		Optional<User> selectedUser = userAccService.getById(id);
		selectedUser.get().getFriends().add(friendId);
		userFunctionsRepository.save(selectedUser.get());
		return selectedUser;
	}
	
	public Optional<User> removeFriend (String id, String friendId){
		Optional<User> selectedUser = userAccService.getById(id);
		selectedUser.get().getFriends().remove(friendId);
		userFunctionsRepository.save(selectedUser.get());
		return selectedUser;
	}
	
	public Optional<User> subscribe (String id, String elementId){
		Optional<User> selectedUser = userAccService.getById(id);
		selectedUser.get().getSubscribed().add(elementId);
		userFunctionsRepository.save(selectedUser.get());
		return selectedUser;
	}
	
	public Optional<User> unsubscribe (String id, String elementId){
		Optional<User> selectedUser = userAccService.getById(id);
		selectedUser.get().getSubscribed().remove(elementId);
		userFunctionsRepository.save(selectedUser.get());
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
				userFunctionsRepository.save(user.get());
				return user;
			case "moderator":
				permissionService.addModeratorPermission(user.get().getPermission());
				userFunctionsRepository.save(user.get());
				return user;
			case "admin":
				permissionService.addAdminPermission(user.get().getPermission());
				userFunctionsRepository.save(user.get());
				return user;
			default:
				return Optional.empty();
					}
			}
		return Optional.empty();
		}
	
	
	public Iterable<Post> getUserFeed(String id){
		
		List<String> friendList;
		List<String> subsList;
		
		List<Post> feedPostsList = new ArrayList<Post>();
		Optional<User> selectedUser = userAccService.getById(id);
		
		friendList = selectedUser.get().getFriends();
		subsList = selectedUser.get().getSubscribed();
		
		for(String friendId : friendList) {
			List<Post> friendPosts = (List<Post>) postService.getUserPosts(friendId);
			for(Post post : friendPosts) {
				feedPostsList.add(post);
			}
		}
		
		for(String friendId : friendList) {
			List<Post> friendPosts = (List<Post>) postService.getUserPosted(friendId);
			for(Post post : friendPosts) {
				feedPostsList.add(post);
			}
		}
		
		for(String subId : subsList) {
			List<Post> subPosts = (List<Post>) elementService.getReviewElementPosts(subId);
			for(Post post : subPosts) {
				feedPostsList.add(post);
			}
		}
		return feedPostsList;
	}
	
	public Iterable<User> getUserFriends(String id){
		Optional<User> selectedUser = userAccService.getById(id);
		List<String> friendIds = selectedUser.get().getFriends();
		List<User> friends = new ArrayList<User>();
		for(String friendId : friendIds) {
			friends.add(userAccService.getById(friendId).get());
		}
		return friends;
	}

	public Iterable<ReviewElement> getUserSubscriptions(String id){
		Optional<User> selectedUser = userAccService.getById(id);
		List<String> subIds = selectedUser.get().getSubscribed();
		List<ReviewElement> subscribed = new ArrayList<ReviewElement>();
		for(String subId : subIds) {
			subscribed.add(elementService.getById(subId).get());
		}
		return subscribed;
	}
	
	public Iterable<ReviewElement> getModerated(String id){
		Optional<User> selectedUser = userAccService.getById(id);
		List<String> modIds = ((Moderator) selectedUser.get().getPermission().getRoleDetails()).getModerated();
		List<ReviewElement> subscribed = new ArrayList<ReviewElement>();
		for(String modId : modIds) {
			subscribed.add(elementService.getById(modId).get());
		}
		return subscribed;
	}

}
