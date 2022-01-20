package reviewnet.platform.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.security.Permission;
import reviewnet.platform.domain.user.ProfileSettings;
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
	
	@Autowired
    private MongoTemplate mongoTemplate;
	
	public Optional<User> addFriend (String id, String friendId){
		Optional<User> selectedUser = userAccService.getById(id);
		Optional<User> selectedFriend = userAccService.getById(friendId);
		selectedUser.get().getFriends().add(friendId);
		selectedFriend.get().getFriends().add(id);
		userFunctionsRepository.save(selectedUser.get());
		userFunctionsRepository.save(selectedFriend.get());
		return selectedUser;
	}
	
	public Optional<User> removeFriend (String id, String friendId){
		Optional<User> selectedUser = userAccService.getById(id);
		Optional<User> selectedFriend = userAccService.getById(friendId);
		selectedUser.get().getFriends().remove(friendId);
		selectedFriend.get().getFriends().remove(id);
		userFunctionsRepository.save(selectedUser.get());
		userFunctionsRepository.save(selectedFriend.get());
		return selectedUser;
	}
	
	public Optional<User> subscribe (String id, String elementId){
		Optional<User> selectedUser = userAccService.getById(id);
		Optional<ReviewElement> selectedElement = elementService.getById(elementId);
		selectedUser.get().getSubscribed().add(elementId);
		selectedElement.get().getSubscribers().add(id);
		userFunctionsRepository.save(selectedUser.get());
		elementService.addElement(selectedElement.get());
		return selectedUser;
	}
	
	public Optional<User> unsubscribe (String id, String elementId){
		Optional<User> selectedUser = userAccService.getById(id);
		Optional<ReviewElement> selectedElement = elementService.getById(elementId);
		selectedUser.get().getSubscribed().remove(elementId);
		selectedElement.get().getSubscribers().remove(id);
		userFunctionsRepository.save(selectedUser.get());
		elementService.addElement(selectedElement.get());
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
			userAccService.addUser(user.get());
			return user;
			
		case 2:
			if(restrictions.contains(RestrictionType.COMMENT)) 
				break;
			user.get().getPermission().getRoleDetails().getRestrictions().add(RestrictionType.COMMENT);
			userAccService.addUser(user.get());
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
			userAccService.addUser(user.get());
			return user;
		case 2:
			user.get().getPermission().getRoleDetails().getRestrictions().remove(RestrictionType.COMMENT);
			userAccService.addUser(user.get());
			return user;
		default:
			return Optional.empty();  
			}
		}
		return Optional.empty();
	}
	
	public Optional<User> updateUserRole(@PathVariable String id, @PathVariable String option){
		Query query = new Query();
		Optional<User> user = userAccService.getById(id);
		if(user.isPresent()) {
			
		query.addCriteria(Criteria.where("userId").is(user.get().getId()));
		List<Permission> oldPermissions= mongoTemplate.find(query, Permission.class);
        for(Permission permission : oldPermissions){
            permissionService.deletePermission(permission);
        }
        
		switch(option) {
			case "subscriber":
				permissionService.addSubscriberPermission(user.get().getPermission(), user.get().getId());
				userFunctionsRepository.save(user.get());
				return user;
			case "moderator":
				permissionService.addModeratorPermission(user.get().getPermission(), user.get().getId());
				userFunctionsRepository.save(user.get());
				return user;
			case "admin":
				permissionService.addAdminPermission(user.get().getPermission(), user.get().getId());
				userFunctionsRepository.save(user.get());
				return user;
			default:
				return Optional.empty();
					}
			}
		return Optional.empty();
		}
	
	
	public Iterable<Post> getUserFeed(String id){
		
		List<String> friendList = new ArrayList<String>();
		List<String> subsList = new ArrayList<String>();
		
		
		List<Post> feedPostsList = new ArrayList<Post>();
		
		Optional<User> selectedUser = userAccService.getById(id);

		
		friendList = selectedUser.get().getFriends();
		subsList = selectedUser.get().getSubscribed();
		
		for(String subId : subsList) {
			try {
				List<Post> subPosts = (List<Post>) elementService.getReviewElementPosts(subId);
				for(Post post : subPosts) {
					feedPostsList.add(post);
				}
			}
			catch(Exception  e) {}
		}	
		for(String friendId : friendList) {
			try {
				List<Post> friendPosts = (List<Post>) postService.getUserPosts(friendId);
				for(Post post : friendPosts) {
					feedPostsList.add(post);
				}
			}
			catch(Exception e) {}
		}
		for(String friendId : friendList) {
			try {
				List<Post> friendPosts = (List<Post>) postService.getUserPosted(friendId);
				for(Post post : friendPosts) {
					feedPostsList.add(post);
				}
			}
			catch(Exception e) {}
		}
        return feedPostsList;
	}
	
	public Iterable<User> getUserFriends(String id){
		Optional<User> selectedUser = userAccService.getById(id);
		List<String> friendIds = selectedUser.get().getFriends();
		List<User> friends = new ArrayList<User>();
		for(String friendId : friendIds) {
			try {
			friends.add(userAccService.getById(friendId).get());
			}
			catch(Exception e) {}
		}
		List<User> friendsInOrder = friends.subList(0, friends.size());
        Collections.reverse(friendsInOrder);
        return friendsInOrder;
	}

	public Iterable<ReviewElement> getUserSubscriptions(String id){
		Optional<User> selectedUser = userAccService.getById(id);
		List<String> subIds = selectedUser.get().getSubscribed();
		List<ReviewElement> subscribed = new ArrayList<ReviewElement>();
		for(String subId : subIds) {
			try {
			subscribed.add(elementService.getById(subId).get());
		}
			catch(Exception e) {}
		}
		
		List<ReviewElement> subscribedInOrder = subscribed.subList(0, subscribed.size());
        Collections.reverse(subscribedInOrder);
        return subscribedInOrder;
	}
	
	public Iterable<ReviewElement> getModerated(String id){
		Optional<User> selectedUser = userAccService.getById(id);
		List<String> modIds = ((Moderator) selectedUser.get().getPermission().getRoleDetails()).getModerated();
		List<ReviewElement> subscribed = new ArrayList<ReviewElement>();	
		for(String modId : modIds) {
			try {
			subscribed.add(elementService.getById(modId).get());
			}
			catch(Exception e) {}
		}
		List<ReviewElement> subscribedInOrder = subscribed.subList(0, subscribed.size());
        Collections.reverse(subscribedInOrder);
        return subscribedInOrder;
	}
	
	public Optional<User> updateProfileSettings(String id, ProfileSettings newProfileSettings){
		Optional<User> selectedUser = userAccService.getById(id);
		selectedUser.get().getProfile().setProfileSettings(newProfileSettings);
		userAccService.addUser(selectedUser.get());
		return selectedUser;
	}

}
