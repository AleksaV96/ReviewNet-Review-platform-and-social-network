package reviewnet.platform.domain.space;

import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ComplainSpace extends AbstractPostSpace {

	public ComplainSpace() {
		super();
	}

	public ComplainSpace(String id, String parentId, String name, String type, List<String> postCollection) {
		super(id, parentId, name, type, postCollection);
	}
	
	
	
	
}
