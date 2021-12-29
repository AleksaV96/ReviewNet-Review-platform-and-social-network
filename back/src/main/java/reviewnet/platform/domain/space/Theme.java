package reviewnet.platform.domain.space;

import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Theme extends AbstractPostSpace {
	
	private String elementId;
	
	public Theme() {}

	public Theme(String id, String parentId, String name, String type, List<String> postCollection) {
		super(id, parentId, name, type, postCollection);
	}

	public String getElementId() {
		return elementId;
	}

	public void setElementId(String elementId) {
		this.elementId = elementId;
	}
	

}
