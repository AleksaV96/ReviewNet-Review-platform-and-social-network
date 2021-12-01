package reviewnet.platform.domain.post;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class Like {
	
	@Id
	private String id;
	private int value;
	private String likeCreatorId;
	
	public Like() {
	}
	
	public Like(String id, int value, String likeCreatorId) {
		this.id = id;
		this.value = value;
		this.likeCreatorId = likeCreatorId;
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

	public String getLikeCreator() {
		return likeCreatorId;
	}

	public void setLikeCreator(String likeCreatorId) {
		this.likeCreatorId = likeCreatorId;
	}
	
	
	
	
	
	
	
}
