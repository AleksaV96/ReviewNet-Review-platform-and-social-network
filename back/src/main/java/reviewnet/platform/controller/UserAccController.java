package reviewnet.platform.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import reviewnet.platform.domain.user.Moderator;
import reviewnet.platform.domain.user.Subscriber;
import reviewnet.platform.domain.user.User;
import reviewnet.platform.service.UserAccService;

@Controller
@RequestMapping("/users")
public class UserAccController {
	
	 @Autowired
	 UserAccService userAccService;
	 
	 @GetMapping(value="/all")
	 public ResponseEntity<Iterable<User>> getAllUsers() {
		 return new ResponseEntity<Iterable<User>>(userAccService.getAll(), HttpStatus.OK);
	 }
	 
	 @GetMapping(value="/userId/{id}")
	 public ResponseEntity<User> getUserById(@PathVariable String id) {
		 Optional<User> accountData = userAccService.getById(id);
		 	if(accountData.isPresent()) {
		 		return new ResponseEntity<User>(accountData.get(), HttpStatus.OK);
	 }
		 	return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	 }
	 
	 @PostMapping(value="/register")
	 public ResponseEntity<User> addUser(@RequestBody User user){
		 userAccService.addUser(user);
		 	return new ResponseEntity<User>(user, HttpStatus.CREATED);
	 }
	 
	 @PostMapping(value="/register/subscriber")
	 public ResponseEntity<User> addSubscriber(@RequestBody Subscriber subscriber){
		 userAccService.addUser(subscriber);
		 	return new ResponseEntity<User>(subscriber, HttpStatus.CREATED);
	 }
	 
	 @PostMapping(value="/register/moderator")
	 public ResponseEntity<User> addModerator(@RequestBody Moderator moderator){
		 userAccService.addUser(moderator);
		 	return new ResponseEntity<User>(moderator, HttpStatus.CREATED);
	 }
	 
	 @PostMapping(value="/register/admin")
	    public ResponseEntity<User> addAdmin(@RequestBody User user){
	        userAccService.addAdmin(user);
	        return new ResponseEntity<User>(user, HttpStatus.CREATED);
	 }
	 
	 @DeleteMapping(value="userId/{id}/remove")
	 	public ResponseEntity<User> removeUser(@PathVariable String id){
		 	try {
	            userAccService.removeUser(id);
	        }catch(Exception e){
	            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
	    }
}
