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
import reviewnet.platform.service.ReviewElementService;
import reviewnet.platform.service.AbstractPostSpaceService;

@Controller
@RequestMapping("/reviewElements")
public class ReviewElementController {
	
	@Autowired
	ReviewElementService reviewElementService;
	
	@Autowired
	AbstractPostSpaceService abstractPostSpaceService;
	
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
	
	@PostMapping(value="/create")
	public ResponseEntity<ReviewElement> addElement(@RequestBody ReviewElement element){
		reviewElementService.addElement(createDomains(element));
			return new ResponseEntity<ReviewElement>(element, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/createCompany")
	public ResponseEntity<ReviewElement> addCompany(@RequestBody Company company){
		reviewElementService.addElement(createDomains(company));
			return new ResponseEntity<ReviewElement>(company, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/createProduct")
	public ResponseEntity<ReviewElement> addProduct(@RequestBody Product product){
		reviewElementService.addElement(createDomains(product));
			return new ResponseEntity<ReviewElement>(product, HttpStatus.CREATED);
	}
	
	@DeleteMapping(value="/reviewElementId/{id}/remove/")
    public ResponseEntity<ReviewElement> removeElement(@PathVariable String id){
        try {
        	reviewElementService.removeElement(id);
        }catch(Exception e){
            return new ResponseEntity<ReviewElement>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<ReviewElement>(HttpStatus.NO_CONTENT);
    }
	
	public ReviewElement createDomains(ReviewElement element) {
		
		List<AbstractPostSpace> domains = new ArrayList<AbstractPostSpace>();
		
		String elementName = element.getName();
		
		ComplainSpace complainSpace = new ComplainSpace();
		Forum forum = new Forum();
		ReviewSpace reviewSpace = new ReviewSpace();
		RoadMapSpace roadMapSpace = new RoadMapSpace();
		
		forum.setName(elementName+" Forum");
		forum.setType("forum");
		abstractPostSpaceService.addPostSpace(forum);
		domains.add(forum);
		
		reviewSpace.setName(elementName+" Reviews");
		reviewSpace.setType("reviewSpace");
		abstractPostSpaceService.addPostSpace(reviewSpace);
		domains.add(reviewSpace);
		
		complainSpace.setName(elementName+" Complain Area");
		complainSpace.setType("complainSpace");
		abstractPostSpaceService.addPostSpace(complainSpace);
		domains.add(complainSpace);
		
		roadMapSpace.setName(elementName+" Road Map");
		roadMapSpace.setType("roadMap");
		abstractPostSpaceService.addPostSpace(roadMapSpace);
		domains.add(roadMapSpace);
		
		element.setDomains(domains);
		return element;
	}
	
	
}
