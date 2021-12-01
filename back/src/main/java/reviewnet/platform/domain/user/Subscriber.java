package reviewnet.platform.domain.user;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Subscriber extends User {
	
	private double rating;
	
	public Subscriber() {
	}

	public Subscriber(String id, String name, String surname, String username, String password, String email, String imgUrl,
			List<String> subscribed, List<String> friends) {
		super(id, name, surname, username, password, email, imgUrl, subscribed, friends);
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}
	
	
	
	
}
