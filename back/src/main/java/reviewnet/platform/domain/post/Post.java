package reviewnet.platform.domain.post;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.user.User;


@Document
public class Post {
	
	@Id
	private String id;
	private String name;
	private String content;
	private String authorUsername;
	private User author;
	private String elementId;
	private String postLocation;
	private List<Like> likes = new ArrayList<Like>();
	private List<String> replies = new ArrayList<String>();
	
	public Post() {
	}
	
	public Post(String id, String name, String content, String authorUsername, User author, String elementId, String postLocation,
			List<Like> likes, List<String> replies) {
		this.id = id;
		this.name = name;
		this.content = content;
		this.authorUsername = authorUsername;
		this.postLocation = postLocation;
		this.author = author;
		this.elementId = elementId;
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

	public String getAuthorUsername() {
		return authorUsername;
	}

	public void setAuthorUsername(String authorUsername) {
		this.authorUsername = authorUsername;
	}
	
	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public String getElementId() {
		return elementId;
	}

	public void setElementId(String elementId) {
		this.elementId = elementId;
	}

	public String getPostLocation() {
		return postLocation;
	}

	public void setPostLocation(String postLocation) {
		this.postLocation = postLocation;
	}

	public List<Like> getLikes() {
		return likes;
	}

	public void setLikes(List<Like> likes) {
		this.likes = likes;
	}
	
	public void addLike(Like like) {
		this.likes.add(like);
	}

	public List<String> getReplies() {
		return replies;
	}

	public void setReplies(List<String> replies) {
		this.replies = replies;
	}
	
	
	
	
}
