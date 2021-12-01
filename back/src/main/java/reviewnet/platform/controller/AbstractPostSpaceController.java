package reviewnet.platform.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.space.AbstractPostSpace;
import reviewnet.platform.service.AbstractPostSpaceService;
import reviewnet.platform.service.PostService;

@Controller
@RequestMapping("/reviewElement")
public class AbstractPostSpaceController {
	
	@Autowired 
	AbstractPostSpaceService abstractPostSpaceService;
	
	@Autowired
	PostService postService;
	
	@GetMapping(value="/postSpace/{id}")
	public ResponseEntity<AbstractPostSpace> getPostSpaceById(@PathVariable String id) {
		Optional<AbstractPostSpace> postSpaceData = abstractPostSpaceService.getById(id);
			if(postSpaceData.isPresent()) {
				return new ResponseEntity<AbstractPostSpace>(postSpaceData.get(), HttpStatus.OK);
	}
			return new ResponseEntity<AbstractPostSpace>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping(value = "/postSpace/{id}/feed")
    public ResponseEntity<Iterable<Post>> getElementDomainFeed(@PathVariable String id) {
        return new ResponseEntity<Iterable<Post>>(postService.getAbstractPostSpacePosts(id), HttpStatus.OK);
    }
	
	@GetMapping(value = "/{id}/domains")
    public ResponseEntity<Iterable<AbstractPostSpace>> getReviewElementDomains(@PathVariable String id) {
        return new ResponseEntity<Iterable<AbstractPostSpace>>(abstractPostSpaceService.getReviewElementDomains(id), HttpStatus.OK);
    }
}
