package reviewnet.platform.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import reviewnet.platform.domain.security.PasswordChangeAttempt;
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
		 	if(accountData.isPresent() && accountData.get().isLogicDelete() == false) {
		 		return new ResponseEntity<User>(accountData.get(), HttpStatus.OK);
	 }
		 	return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	 }
	 
	 @GetMapping(value="/admin/userId/{id}")
	 public ResponseEntity<User> getUserByIdAdmin(@PathVariable String id) {
		 Optional<User> accountData = userAccService.getById(id);
		 	if(accountData.isPresent()) {
		 		return new ResponseEntity<User>(accountData.get(), HttpStatus.OK);
	 }
		 	return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	 }
	 
	 @GetMapping(value="/{username}")
	 public ResponseEntity<User> getByUsername(@PathVariable String username) {
		 Optional<User> accountData = userAccService.findByUsername(username);
		 	if(accountData.isPresent() && accountData.get().isLogicDelete() == false) {
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
	 public ResponseEntity<User> addSubscriber(@RequestBody User user){
		 HttpStatus accCreatorHandler = userAccService.addSubscriber(user);
	     if(accCreatorHandler == HttpStatus.CREATED) {
	        return new ResponseEntity<User>(user, HttpStatus.CREATED);
	        }
	     else if(accCreatorHandler == HttpStatus.IM_USED) {
	        return new ResponseEntity<User>(user, HttpStatus.IM_USED);
	        }
	     else {
	        return new ResponseEntity<User>(user, HttpStatus.BAD_REQUEST);
	        }
	 }
	 
	 @PostMapping(value="/register/moderator")
		 public ResponseEntity<User> addModerator(@RequestBody User user){
			 HttpStatus accCreatorHandler = userAccService.addModerator(user);
		     if(accCreatorHandler == HttpStatus.CREATED) {
		        return new ResponseEntity<User>(user, HttpStatus.CREATED);
		        }
		     else if(accCreatorHandler == HttpStatus.IM_USED) {
		        return new ResponseEntity<User>(user, HttpStatus.IM_USED);
		        }
		     else {
		        return new ResponseEntity<User>(user, HttpStatus.BAD_REQUEST);
		        }
	 }
	 
	 @PostMapping(value="/register/admin")
	    public ResponseEntity<User> addAdmin(@RequestBody User user){
	        HttpStatus accCreatorHandler = userAccService.addAdmin(user);
	        if(accCreatorHandler == HttpStatus.CREATED) {
	        	return new ResponseEntity<User>(user, HttpStatus.CREATED);
	        }
	        else if(accCreatorHandler == HttpStatus.IM_USED) {
	        	return new ResponseEntity<User>(user, HttpStatus.IM_USED);
	        }
	        else {
	        	return new ResponseEntity<User>(user, HttpStatus.BAD_REQUEST);
	        }
	        
	 }
	 
	 @PutMapping(value="/edit/{id}")
	 public ResponseEntity<User> editUser(@PathVariable String id, @RequestBody User user){
		 HttpStatus userEditHandler = userAccService.updateUser(id, user);
		 if(userEditHandler == HttpStatus.ACCEPTED) {
	        	return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	        }
		 return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	 }
	 
	 @PutMapping(value="/change-password/{id}")
	 public ResponseEntity<User> changePassword(@PathVariable String id, @RequestBody PasswordChangeAttempt password) {
		 HttpStatus changePasswordHandler = userAccService.changePassword(id, password);
		 if(changePasswordHandler == HttpStatus.ACCEPTED) {
			 return new ResponseEntity<User>(HttpStatus.ACCEPTED);
		 }
		 else if(changePasswordHandler == HttpStatus.UNAUTHORIZED) {
			 return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
		 }
		 else {
			 return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
		 }
	 }
	 
	 @PutMapping(value="userId/{id}/logic-delete")
	 	public ResponseEntity<User> logicDeleteUser(@PathVariable String id){
		 	try {
	            userAccService.logicDeleteUser(id);
	        }catch(Exception e){
	            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<User>(HttpStatus.ACCEPTED);
	 }
	 
	 @PutMapping(value="userId/{id}/restore-user")
	 	public ResponseEntity<User> restoreUser(@PathVariable String id){
		 	try {
	            userAccService.restoreUser(id);
	        }catch(Exception e){
	            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<User>(HttpStatus.ACCEPTED);
	 }
	 
	 @PutMapping(value="userId/{id}/set-active-status")
	 	public ResponseEntity<User> activeStauts(@PathVariable String id, @RequestBody boolean status){
		 	try {
	            userAccService.setActiveStatus(id, status);
	        }catch(Exception e){
	            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<User>(HttpStatus.ACCEPTED);
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
