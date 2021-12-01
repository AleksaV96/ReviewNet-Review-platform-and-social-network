package reviewnet.platform.domain;

import java.util.List;

import reviewnet.platform.domain.user.User;
import reviewnet.platform.domain.element.ReviewElement;

public class Stakeholders {
	
	private List<User> users;
	private List<ReviewElement> elements;
	
	public Stakeholders(List<User> users, List<ReviewElement> elements) {
		this.users = users;
		this.elements = elements;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public List<ReviewElement> getElements() {
		return elements;
	}

	public void setElements(List<ReviewElement> elements) {
		this.elements = elements;
	}
	
}
