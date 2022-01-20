package reviewnet.platform.domain.post.type;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.post.Like;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.user.User;

@Document
public class ComplainPost extends Post {
	
	public ComplainPost() {
	}

	public ComplainPost(String id, String name, String content, String authorUsername, User author, String elementId,
			String domainId, String postLocation, String type, List<Like> likes, List<String> replies) {
		super(id, name, content, authorUsername, author, elementId, domainId, postLocation, type, likes, replies);
	}
	
}
