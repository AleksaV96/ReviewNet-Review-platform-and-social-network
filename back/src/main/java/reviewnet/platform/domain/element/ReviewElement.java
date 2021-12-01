package reviewnet.platform.domain.element;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.space.AbstractPostSpace;

@Document
public class ReviewElement {
	
	private String id;
	private String name;
	private String description;
	private String imgUrl;
	private double rating;
	private List<String> moderators;
	private List<AbstractPostSpace> domains;
	
	public ReviewElement() {}
	
	public ReviewElement(String id, String name, String description, String imgUrl, double rating, 
			List<String> moderators, List<AbstractPostSpace> domains) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.imgUrl = imgUrl;
		this.rating = rating;
		this.moderators = moderators;
		this.domains = domains;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}
	
	public List<String> getModerators() {
		return moderators;
	}

	public void setModerators(List<String> moderators) {
		this.moderators = moderators;
	}

	public List<AbstractPostSpace> getDomains() {
		return domains;
	}

	public void setDomains(List<AbstractPostSpace> domains) {
		this.domains = domains;
	}

	
	
}
