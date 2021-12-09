package reviewnet.platform.domain.post.type;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.post.Like;
import reviewnet.platform.domain.post.Post;

@Document
public class RoadMapPost extends Post {
	
	public RoadMapPost() {
	}

	public RoadMapPost(String id, String name, String content, String authorUsername, Like[] likes, List<String> replies) {
		super(id, name, content, authorUsername, likes, replies);
	}
	
	
}
