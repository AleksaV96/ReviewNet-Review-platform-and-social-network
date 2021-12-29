package reviewnet.platform.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import reviewnet.platform.domain.post.Like;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.service.LikeService;
import reviewnet.platform.service.ReplyService;

@Controller
@RequestMapping("/posts/replies")
public class ReplyContoller {
	
	@Autowired
	ReplyService replyService;
	
	@Autowired
	LikeService likeService;
	
	@GetMapping(value="/all")
	public ResponseEntity<Iterable<Post>> getAllReplies() {
		return new ResponseEntity<Iterable<Post>>(replyService.getAll(), HttpStatus.OK);
	}
	
	@GetMapping(value="/replyId/{id}")
	public ResponseEntity<Post> getReplyById(@PathVariable String id) {
		Optional<Post> replyData = replyService.getById(id);
			if(replyData.isPresent()) {
				return new ResponseEntity<Post>(replyData.get(), HttpStatus.OK);
	}
			return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping(value="/replyId/{id}/removeReply")
    public ResponseEntity<Post> removeReply(@PathVariable String id){
        try {
        	replyService.removeReply(id);
        }catch(Exception e){
            return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Post>(HttpStatus.NO_CONTENT);
    }
	
	@PostMapping(value = "replyId/{id}/like")
    public ResponseEntity<String> likeReply(@PathVariable String id, @RequestBody Like like) {
        likeService.likeReply(id, like.getLikeCreatorName(), like.getType(), like.getValue());
        return new ResponseEntity<String>("Liked", HttpStatus.OK);
    }

    @PostMapping(value = "replyId/{id}/unlike")
    public ResponseEntity<String> unlikeReply(@PathVariable String id, @RequestBody Like like) {
        likeService.unlikeReply(id, like.getLikeCreatorName(), like.getType());
        return new ResponseEntity<String>("Unliked", HttpStatus.OK);
    }
}
