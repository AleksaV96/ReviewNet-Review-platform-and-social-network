package reviewnet.platform.domain.user;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.security.AuthProvider;
import reviewnet.platform.domain.security.Permission;

@Document
public class Subscriber extends User {
	
	private double rating;
	
	public Subscriber() {
	}

	public Subscriber(String id, String name, String surname, String username, String password, String email, String imgUrl,
			List<String> subscribed, List<String> friends, Permission permission, AuthProvider provider) {
		super(id, name, surname, username, password, email, imgUrl, subscribed, friends, permission, provider);
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}
	
	
	
	
}
