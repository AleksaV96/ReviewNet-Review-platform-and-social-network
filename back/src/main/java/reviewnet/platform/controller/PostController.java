package reviewnet.platform.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import reviewnet.platform.domain.post.Like;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.post.Reply;
import reviewnet.platform.domain.post.type.ComplainPost;
import reviewnet.platform.domain.post.type.ForumPost;
import reviewnet.platform.domain.post.type.ReviewPost;
import reviewnet.platform.domain.post.type.RoadMapPost;
import reviewnet.platform.service.AbstractPostSpaceService;
import reviewnet.platform.service.LikeService;
import reviewnet.platform.service.PostService;
import reviewnet.platform.service.ReplyService;

@Controller
@RequestMapping("/posts")
public class PostController {
	
	@Autowired
	PostService postService;
	
	@Autowired
	LikeService likeService;
	
	@Autowired
	ReplyService replyService;
	
	@Autowired
	AbstractPostSpaceService abstractPostSpaceService;
	
	@GetMapping(value="/all")
	public ResponseEntity<Iterable<Post>> getAllPosts() {
		return new ResponseEntity<Iterable<Post>>(postService.getAll(), HttpStatus.OK);
	}
	
	@GetMapping(value="/postId/{id}")
	public ResponseEntity<Post> getPostById(@PathVariable String id) {
		Optional<Post> postData = postService.getById(id);
			if(postData.isPresent()) {
				return new ResponseEntity<Post>(postData.get(), HttpStatus.OK);
	}
			return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping(value="/postSpaceId/{id}/addpost")
	public ResponseEntity<Post> addPost(@PathVariable String id, @RequestBody Post post){
		postService.addPost(id, post);
			return new ResponseEntity<Post>(post, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/forumId/{id}/addpost")
	public ResponseEntity<Post> addForumPost(@PathVariable String id,@RequestBody ForumPost forumPost){
		postService.addPost(id, forumPost);
			return new ResponseEntity<Post>(forumPost, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/reviewSpaceId/{id}/addpost")
	public ResponseEntity<Post> addReviewSpacePost(@PathVariable String id, @RequestBody ReviewPost reviewPost){
		postService.addPost(id, reviewPost);
			return new ResponseEntity<Post>(reviewPost, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/roadMapId/{id}/addpost")
	public ResponseEntity<Post> addRoadMapPost(@PathVariable String id, @RequestBody RoadMapPost roadMapPost){
		postService.addPost(id, roadMapPost);
			return new ResponseEntity<Post>(roadMapPost, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/complainSpaceId/{id}/addpost")
	public ResponseEntity<Post> addComplainPost(@PathVariable String id, @RequestBody ComplainPost complainPost){
		postService.addPost(id, complainPost);
			return new ResponseEntity<Post>(complainPost, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/themeId/{id}/addpost")
	public ResponseEntity<Post> addThemePost(@PathVariable String id, @RequestBody ForumPost forumPost){
		postService.addThemePost(id, forumPost);
			return new ResponseEntity<Post>(forumPost, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/postId/{id}/addReply")
	public ResponseEntity<Reply> addReply(@PathVariable String id, @RequestBody Reply reply){
		replyService.addReply(id, reply);
			return new ResponseEntity<Reply>(reply, HttpStatus.CREATED);
	}
	
	@GetMapping(value = "/postId/{id}/replies")
    public ResponseEntity<Iterable<Post>> getPostReplies(@PathVariable String id) {
        return new ResponseEntity<Iterable<Post>>(replyService.getPostReplies(id), HttpStatus.OK);
    }
	
	@DeleteMapping(value="/postId/{id}/remove")
    public ResponseEntity<Post> removePost(@PathVariable String id){
        try {
        	postService.removePost(id);
        }catch(Exception e){
            return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Post>(HttpStatus.NO_CONTENT);
    }
	
	@DeleteMapping(value="/postId/{id}/removeReply")
    public ResponseEntity<Post> removeReply(@PathVariable String id){
        try {
        	postService.removeReply(id);
        }catch(Exception e){
            return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Post>(HttpStatus.NO_CONTENT);
    }
	
	@PostMapping(value = "postId/{id}/like")
    public ResponseEntity<String> likePost(@PathVariable String id, @RequestBody Like like) {
        likeService.likePost(id, like.getLikeCreatorName(), like.getType(), like.getValue());
        return new ResponseEntity<String>("Liked", HttpStatus.OK);
    }

    @PostMapping(value = "postId/{id}/unlike")
    public ResponseEntity<String> unlikePost(@PathVariable String id, @RequestBody Like like) {
        likeService.unlikePost(id, like.getLikeCreatorName(), like.getType());
        return new ResponseEntity<String>("Unliked", HttpStatus.OK);
    }
    
}