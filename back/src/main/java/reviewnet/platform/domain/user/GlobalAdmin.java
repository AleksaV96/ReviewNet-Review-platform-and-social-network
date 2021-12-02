package reviewnet.platform.domain.user;

import java.util.List;

import reviewnet.platform.domain.security.AuthProvider;
import reviewnet.platform.domain.security.Permission;

public class GlobalAdmin extends User {

	public GlobalAdmin() {
	}

	public GlobalAdmin(String id, String name, String surname, String username, String password, String email,
			String imgUrl, List<String> subscribed, List<String> friends, Permission permission, AuthProvider provider) {
		super(id, name, surname, username, password, email, imgUrl, subscribed, friends, permission, provider);
	}
	
}
