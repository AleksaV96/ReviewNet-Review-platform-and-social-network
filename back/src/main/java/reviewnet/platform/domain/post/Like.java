package reviewnet.platform.domain.post;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class Like {
	
	@Id
	private String id;
	private int value;
	private String type;
	private String likeCreatorName;
	
	public Like() {
	}
	
	public Like(String id, int value, String type, String likeCreatorName) {
		this.id = id;
		this.value = value;
		this.type = type;
		this.likeCreatorName = likeCreatorName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}


	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getLikeCreatorName() {
		return likeCreatorName;
	}

	public void setLikeCreatorName(String likeCreatorName) {
		this.likeCreatorName = likeCreatorName;
	}

	
	
	
	
	
	
	
	
}
