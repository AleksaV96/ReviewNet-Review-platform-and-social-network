package reviewnet.platform.domain.post;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class Reply extends Post {
	
	public Reply() {
	}

	public Reply(String id, String name, String content, String authorUsername, List<Like> likes, List<String> replies) {
		super(id, name, content, authorUsername, likes, replies);
	}
		

}
