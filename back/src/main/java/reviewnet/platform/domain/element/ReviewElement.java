package reviewnet.platform.domain.element;

import java.util.ArrayList;
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
	private String creatorId;
	private List<String> moderators = new ArrayList<String>();
	private List<String> subscribers = new ArrayList<String>();
	private List<AbstractPostSpace> domains;
	
	public ReviewElement() {}
	
	public ReviewElement(String id, String name, String description, String imgUrl, double rating, String creatorId,
			List<String> moderators, List<String> subscribers, List<AbstractPostSpace> domains) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.imgUrl = imgUrl;
		this.rating = rating;
		this.creatorId = creatorId;
		this.moderators = moderators;
		this.subscribers = subscribers;
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
	
	public String getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}

	public List<String> getModerators() {
		return moderators;
	}

	public void setModerators(List<String> moderators) {
		this.moderators = moderators;
	}
	
	public void addModerator(String moderatorId) {
		this.moderators.add(moderatorId);
	}

	public List<String> getSubscribers() {
		return subscribers;
	}

	public void setSubscribers(List<String> subscribers) {
		this.subscribers = subscribers;
	}

	public List<AbstractPostSpace> getDomains() {
		return domains;
	}

	public void setDomains(List<AbstractPostSpace> domains) {
		this.domains = domains;
	}

	
	
}
