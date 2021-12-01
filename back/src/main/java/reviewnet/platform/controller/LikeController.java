package reviewnet.platform.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import reviewnet.platform.domain.post.Like;
import reviewnet.platform.service.LikeService;

@Controller
@RequestMapping("/posts/likes")
public class LikeController {
	
	@Autowired
	LikeService likeService;
	
	@GetMapping(value="/all")
	public ResponseEntity<Iterable<Like>> getAllLikes() {
		return new ResponseEntity<Iterable<Like>>(likeService.getAll(), HttpStatus.OK);
	}
	
	@GetMapping(value="/{id}")
	public ResponseEntity<Like> getLikeById(@PathVariable String id) {
		Optional<Like> likeData = likeService.getById(id);
			if(likeData.isPresent()) {
				return new ResponseEntity<Like>(likeData.get(), HttpStatus.OK);
	}
			return new ResponseEntity<Like>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping(value="/create")
	public ResponseEntity<Like> addLike(@RequestBody Like like){
		likeService.like(like);
			return new ResponseEntity<Like>(like, HttpStatus.CREATED);
	}
	
	@DeleteMapping(value="/remove/{id}")
    public ResponseEntity<Like> removeLike(@PathVariable String id){
        try {
        	likeService.deleteLike(id);
        }catch(Exception e){
            return new ResponseEntity<Like>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Like>(HttpStatus.NO_CONTENT);
    }
	
}
