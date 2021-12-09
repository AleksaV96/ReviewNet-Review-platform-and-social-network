package reviewnet.platform.domain.post.type;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.post.Like;
import reviewnet.platform.domain.post.Post;


@Document
public class ReviewPost extends Post {
	
	private double grade;
	
	public ReviewPost() {
	}

	public ReviewPost(String id, String name, String content, String authorUsername, Like[] likes, List<String> replies,
			double grade) {
		super(id, name, content, authorUsername, likes, replies);
		this.grade = grade;
	}

	public double getGrade() {
		return grade;
	}

	public void setGrade(double grade) {
		this.grade = grade;
	}
	
	
}
