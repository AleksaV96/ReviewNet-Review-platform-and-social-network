package reviewnet.platform.domain.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class User {
	
	@Id
	private String id;
	private String name;
	private String surname;
	private String username;
	private String password;
    private String email;
    private String imgUrl;
    private List<String> subscribed = new ArrayList<String>();
    private List<String> friends = new ArrayList<String>();
    //private Permission permission;
    //@NotNull
    //@Enumerated(EnumType.STRING)
    //private AuthProvider provider;
    
    public User() {}
    
    public User(String id, String name, String surname, String username, String password, String email, 
    		String imgUrl, List<String> subscribed, List<String> friends) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
		this.email = email;
		this.imgUrl = imgUrl;
		this.subscribed = subscribed;
		this.friends = friends;
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
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public List<String> getSubscribed() {
		return subscribed;
	}

	public void setSubscribed(List<String> subscribed) {
		this.subscribed = subscribed;
	}

	public List<String> getFriends() {
		return friends;
	}

	public void setFriends(List<String> friends) {
		this.friends = friends;
	}
	 
}
