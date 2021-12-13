package reviewnet.platform.domain.space;

import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.post.Post;

@Document
public class Theme extends AbstractPostSpace {
	

	public Theme(String id, String parentId, String name, String type, List<String> postCollection) {
		super(id, parentId, name, type, postCollection);
	}

}
