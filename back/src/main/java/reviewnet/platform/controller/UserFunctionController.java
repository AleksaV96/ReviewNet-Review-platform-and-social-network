package reviewnet.platform.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.user.ProfileSettings;
import reviewnet.platform.domain.user.User;
import reviewnet.platform.service.UserAccService;
import reviewnet.platform.service.UserFunctionsService;

@Controller
@RequestMapping("/users")
public class UserFunctionController {
	
	@Autowired
	UserAccService userAccService;
	
	@Autowired
	UserFunctionsService userFuncService;
	
	
	@PutMapping(value="/{id}/restrict/{option}")
	public ResponseEntity<User> restrictUserFunction(@PathVariable String id, @PathVariable int option){
		Optional<User> editedUser = userFuncService.restrictUserFunction(id, option);
		if(editedUser.isPresent()) {
			return new ResponseEntity<User>(editedUser.get(), HttpStatus.CREATED);
		}
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping(value="/{id}/remove-restriction/{option}")
	public ResponseEntity<User> removeUserRestriction(@PathVariable String id, @PathVariable int option){
		Optional<User> editedUser = userFuncService.removeUserRestriction(id, option);
		if(editedUser.isPresent()) {
			return new ResponseEntity<User>(editedUser.get(), HttpStatus.CREATED);
		}
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping(value="/{id}/update-user-role/{option}")
	public ResponseEntity<User> updateUserRole(@PathVariable String id, @PathVariable String option){
		Optional<User> editedUser = userFuncService.updateUserRole(id, option);
		if(editedUser.isPresent()) {
			return new ResponseEntity<User>(editedUser.get(), HttpStatus.CREATED);
		}
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping(value="/userId/{id}/add-friend/{friendId}")
	public ResponseEntity<User> addFriend(@PathVariable String id, @PathVariable String friendId){
		Optional<User> selectedUser = userFuncService.addFriend(id, friendId);
		if(selectedUser.isPresent()) {
			return new ResponseEntity<User>(selectedUser.get(), HttpStatus.CREATED);
		}
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping(value="/userId/{id}/remove-friend/{friendId}")
	public ResponseEntity<User> removeFriend(@PathVariable String id, @PathVariable String friendId){
		Optional<User> selectedUser = userFuncService.removeFriend(id, friendId);
		if(selectedUser.isPresent()) {
			return new ResponseEntity<User>(selectedUser.get(), HttpStatus.CREATED);
		}
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping(value="/userId/{id}/subscribe/{elementId}")
	public ResponseEntity<User> subscribe(@PathVariable String id, @PathVariable String elementId){
		Optional<User> selectedUser = userFuncService.subscribe(id, elementId);
		if(selectedUser.isPresent()) {
			return new ResponseEntity<User>(selectedUser.get(), HttpStatus.CREATED);
		}
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping(value="/userId/{id}/unsubscribe/{elementId}")
	public ResponseEntity<User> unsubscribe(@PathVariable String id, @PathVariable String elementId){
		Optional<User> selectedUser = userFuncService.unsubscribe(id, elementId);
		if(selectedUser.isPresent()) {
			return new ResponseEntity<User>(selectedUser.get(), HttpStatus.CREATED);
		}
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping(value="/userId/{id}/getFeed")
	public ResponseEntity<Iterable<Post>> getUserFeed(@PathVariable String id){
		return new ResponseEntity<Iterable<Post>>(userFuncService.getUserFeed(id), HttpStatus.OK);
	}
	
	@GetMapping(value="/userId/{id}/get-friends")
	public ResponseEntity<Iterable<User>> getUserFriends(@PathVariable String id){
		return new ResponseEntity<Iterable<User>>(userFuncService.getUserFriends(id), HttpStatus.OK);
	}
	
	@GetMapping(value="/userId/{id}/get-subscriptions")
	public ResponseEntity<Iterable<ReviewElement>> getUserSubscriptions(@PathVariable String id){
		return new ResponseEntity<Iterable<ReviewElement>>(userFuncService.getUserSubscriptions(id), HttpStatus.OK);
	}
	
	@GetMapping(value="/userId/{id}/get-moderated")
	public ResponseEntity<Iterable<ReviewElement>> getModeratorsModerated(@PathVariable String id){
		return new ResponseEntity<Iterable<ReviewElement>>(userFuncService.getModerated(id), HttpStatus.OK);
	}
	
	@PutMapping(value="/userId/{id}/update-profile-settings")
	public ResponseEntity<User> updateProfileSettings(@PathVariable String id, @RequestBody ProfileSettings newProfileSettings){
		userFuncService.updateProfileSettings(id, newProfileSettings);
		return new ResponseEntity<User>(HttpStatus.OK);
	}
	
}
