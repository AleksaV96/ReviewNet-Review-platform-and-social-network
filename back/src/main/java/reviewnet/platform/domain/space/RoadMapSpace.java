package reviewnet.platform.domain.space;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class RoadMapSpace extends AbstractPostSpace {
	
	public RoadMapSpace() {
	}
	
	public RoadMapSpace(String id, String parentId, String name, String type, List<String> postCollection) {
		super(id, parentId, name, type, postCollection);
	}
	
}
