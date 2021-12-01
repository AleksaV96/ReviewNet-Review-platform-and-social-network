package reviewnet.platform.domain.space;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class AbstractPostSpace {
	
	private String id;
	private String parentId;
	private String name;
	private String type;
	private List<String> postCollection = new ArrayList<String>();
	
	public AbstractPostSpace() {}
	
	public AbstractPostSpace(String id, String parentId, String name, String type, List<String> postCollection) {
		this.id = id;
		this.parentId = parentId;
		this.name = name;
		this.type = type;
		this.postCollection = postCollection;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<String> getPostCollection() {
		return postCollection;
	}

	public void setPostCollection(List<String> postCollection) {
		this.postCollection = postCollection;
	}

}
