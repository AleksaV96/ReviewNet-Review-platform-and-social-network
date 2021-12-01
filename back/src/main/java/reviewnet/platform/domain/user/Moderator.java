package reviewnet.platform.domain.user;

import java.util.List;

public class Moderator extends User {

	public Moderator() {
	}

	public Moderator(String id, String name, String surname, String username, String password, String email,
			String imgUrl, List<String> subscribed, List<String> friends) {
		super(id, name, surname, username, password, email, imgUrl, subscribed, friends);
	}
	
	
}
