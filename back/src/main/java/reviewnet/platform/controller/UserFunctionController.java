package reviewnet.platform.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
	
}
