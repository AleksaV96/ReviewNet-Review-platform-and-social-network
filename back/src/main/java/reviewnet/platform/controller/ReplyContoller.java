package reviewnet.platform.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import reviewnet.platform.domain.post.Reply;
import reviewnet.platform.service.ReplyService;

@Controller
@RequestMapping("/posts/replies")
public class ReplyContoller {
	
	@Autowired
	ReplyService replyService;
	
	@GetMapping(value="/all")
	public ResponseEntity<Iterable<Reply>> getAllReplies() {
		return new ResponseEntity<Iterable<Reply>>(replyService.getAll(), HttpStatus.OK);
	}
	
	@GetMapping(value="/replyId/{id}")
	public ResponseEntity<Reply> getReplyById(@PathVariable String id) {
		Optional<Reply> replyData = replyService.getById(id);
			if(replyData.isPresent()) {
				return new ResponseEntity<Reply>(replyData.get(), HttpStatus.OK);
	}
			return new ResponseEntity<Reply>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping(value="/replyId/{id}/removeReply")
    public ResponseEntity<Reply> removeReply(@PathVariable String id){
        try {
        	replyService.removeReply(id);
        }catch(Exception e){
            return new ResponseEntity<Reply>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Reply>(HttpStatus.NO_CONTENT);
    }
}
