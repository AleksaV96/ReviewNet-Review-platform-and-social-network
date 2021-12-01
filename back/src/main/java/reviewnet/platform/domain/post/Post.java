package reviewnet.platform.domain.post;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class Post {
	
	@Id
	private String id;
	private String name;
	private String content;
	private String creatorId;
	private Like[] likes;
	private List<String> replies = new ArrayList<String>();
	
	public Post() {
	}
	
	public Post(String id, String name, String content, String creatorId, Like[] likes, List<String> replies) {
		this.id = id;
		this.name = name;
		this.content = content;
		this.creatorId = creatorId;
		this.likes = likes;
		this.replies = replies;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}

	public Like[] getLikes() {
		return likes;
	}

	public void setLikes(Like[] likes) {
		this.likes = likes;
	}

	public List<String> getReplies() {
		return replies;
	}

	public void setReplies(List<String> replies) {
		this.replies = replies;
	}
	
	
	
	
}
