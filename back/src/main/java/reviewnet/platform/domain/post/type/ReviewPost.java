package reviewnet.platform.domain.post.type;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.post.Like;
import reviewnet.platform.domain.post.Post;
import reviewnet.platform.domain.user.User;


@Document
public class ReviewPost extends Post {
	
	private double grade;
	
	public ReviewPost() {
	}

	

	public ReviewPost(String id, String name, String content, String authorUsername, User author, String elementId,
			String domainId, String postLocation, String type, List<Like> likes, List<String> replies, double grade) {
		super(id, name, content, authorUsername, author, elementId, domainId, postLocation, type, likes, replies);
		this.grade = grade;
	}



	public double getGrade() {
		return grade;
	}

	public void setGrade(double grade) {
		this.grade = grade;
	}
	
	
}
