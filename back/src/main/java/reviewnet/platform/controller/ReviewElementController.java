package reviewnet.platform.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import reviewnet.platform.domain.element.Company;
import reviewnet.platform.domain.element.Product;
import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.space.AbstractPostSpace;
import reviewnet.platform.domain.space.ComplainSpace;
import reviewnet.platform.domain.space.Forum;
import reviewnet.platform.domain.space.ReviewSpace;
import reviewnet.platform.domain.space.RoadMapSpace;
import reviewnet.platform.domain.user.User;
import reviewnet.platform.domain.user.role.Moderator;
import reviewnet.platform.repository.user.UserRepository;
import reviewnet.platform.service.ReviewElementService;
import reviewnet.platform.service.UserAccService;
import reviewnet.platform.service.AbstractPostSpaceService;

@Controller
@RequestMapping("/reviewElements")
public class ReviewElementController {
	
	@Autowired
	ReviewElementService reviewElementService;
	
	@Autowired
	AbstractPostSpaceService abstractPostSpaceService;
	
	@Autowired
	UserAccService userService;
	
	@Autowired 
	UserRepository userRepository;
	
	@GetMapping(value="/all")
	public ResponseEntity<Iterable<ReviewElement>> getAllElements() {
		return new ResponseEntity<Iterable<ReviewElement>>(reviewElementService.getAll(), HttpStatus.OK);
	}
	
	@GetMapping(value="/reviewElementId/{id}")
	public ResponseEntity<ReviewElement> getElementById(@PathVariable String id) {
		Optional<ReviewElement> elementData = reviewElementService.getById(id);
			if(elementData.isPresent()) {
				return new ResponseEntity<ReviewElement>(elementData.get(), HttpStatus.OK);
	}
			return new ResponseEntity<ReviewElement>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping(value="/reviewElementName/{name}")
	public ResponseEntity<ReviewElement> getElementByName(@PathVariable String name) {
		Optional<ReviewElement> elementData = reviewElementService.findByName(name);
			if(elementData.isPresent()) {
				return new ResponseEntity<ReviewElement>(elementData.get(), HttpStatus.OK);
	}
			return new ResponseEntity<ReviewElement>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping(value="/create")
	public ResponseEntity<ReviewElement> addElement(@RequestBody ReviewElement element){
		reviewElementService.addElement(element);
		createDomains(element, element.getCreatorId());
			return new ResponseEntity<ReviewElement>(element, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/createCompany")
	public ResponseEntity<ReviewElement> addCompany(@RequestBody Company company){
		reviewElementService.addElement(company);
		createDomains(company, company.getCreatorId());
			return new ResponseEntity<ReviewElement>(company, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/createProduct")
	public ResponseEntity<ReviewElement> addProduct(@RequestBody Product product){
		reviewElementService.addElement(product);
		createDomains(product, product.getCreatorId());
			return new ResponseEntity<ReviewElement>(product, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/userId/{id}/addModerator/{elementId}")
	public void addModerator(@PathVariable String id, @PathVariable String elementId){
		reviewElementService.addModerator(id, elementId);
	}
	
	@PostMapping(value="/userId/{id}/removeModerator/{elementId}")
	public void removeModerator(@PathVariable String id, @PathVariable String elementId){
		reviewElementService.removeModerator(id, elementId);
	}
	
	@GetMapping(value="/elementId/{id}/get-moderators")
	public ResponseEntity<Iterable<User>> getModerators(@PathVariable String id){
		return new ResponseEntity<Iterable<User>>(reviewElementService.getModerators(id), HttpStatus.OK);
	}
	
	@GetMapping(value="/elementId/{id}/get-subscribers")
	public ResponseEntity<Iterable<User>> getSubscribers(@PathVariable String id){
		return new ResponseEntity<Iterable<User>>(reviewElementService.getSubscribers(id), HttpStatus.OK);
	}
	
	@DeleteMapping(value="/reviewElementId/{id}/remove")
    public ResponseEntity<ReviewElement> removeElement(@PathVariable String id){
        try {
        	reviewElementService.removeElement(id);
        }catch(Exception e){
            return new ResponseEntity<ReviewElement>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<ReviewElement>(HttpStatus.NO_CONTENT);
    }
	
	public void createDomains(ReviewElement element, String userId) {
		
		Optional<ReviewElement> elementData = reviewElementService.findByName(element.getName());
		Optional<User> userData = userService.getById(userId);
		List<AbstractPostSpace> domains = new ArrayList<AbstractPostSpace>();
		
		elementData.get().addModerator(userId);
		
		String elementName = elementData.get().getName();
		String elementId = elementData.get().getId();
		
		ComplainSpace complainSpace = new ComplainSpace();
		Forum forum = new Forum();
		ReviewSpace reviewSpace = new ReviewSpace();
		RoadMapSpace roadMapSpace = new RoadMapSpace();
		
		forum.setParentId(elementId);
		forum.setName(elementName+" Forum");
		forum.setType("forum");
		abstractPostSpaceService.addPostSpace(forum);
		domains.add(forum);
		
		reviewSpace.setParentId(elementId);
		reviewSpace.setName(elementName+" Reviews");
		reviewSpace.setType("reviewSpace");
		abstractPostSpaceService.addPostSpace(reviewSpace);
		domains.add(reviewSpace);
		
		complainSpace.setParentId(elementId);
		complainSpace.setName(elementName+" Complains");
		complainSpace.setType("complainSpace");
		abstractPostSpaceService.addPostSpace(complainSpace);
		domains.add(complainSpace);
		
		roadMapSpace.setParentId(elementId);
		roadMapSpace.setName(elementName+" RoadMap");
		roadMapSpace.setType("roadMap");
		abstractPostSpaceService.addPostSpace(roadMapSpace);
		domains.add(roadMapSpace);
		
		elementData.get().setDomains(domains);
		reviewElementService.addElement(elementData.get());
		((Moderator) userData.get().getPermission().getRoleDetails()).addModerated(elementData.get().getId());
		userRepository.save(userData.get());
	}
	
	
}
