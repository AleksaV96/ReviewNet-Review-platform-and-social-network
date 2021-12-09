package reviewnet.platform.dto;

import java.util.List;

import reviewnet.platform.domain.security.Permission;

public class UserViewDTO {
	
	private String name;
	private String surname;
	private String username;
	private String password;
    private String email;
    private String imgUrl;
    private List<String> subscribed;
    private List<String> friends;
    private Permission permission;
    
    public UserViewDTO() {}

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

	public Permission getPermission() {
		return permission;
	}

	public void setPermission(Permission permission) {
		this.permission = permission;
	}
    
    
	
}
