package reviewnet.platform.domain.post.type;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.post.Like;
import reviewnet.platform.domain.post.Post;

@Document
public class ComplainPost extends Post {
	
	public ComplainPost() {
	}
	
	public ComplainPost(String id, String name, String content, String creatorId, Like[] likes, List<String> replies) {
		super(id, name, content, creatorId, likes, replies);
	}

	
	
}
