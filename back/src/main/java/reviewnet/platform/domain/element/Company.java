package reviewnet.platform.domain.element;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.space.AbstractPostSpace;

@Document
public class Company extends ReviewElement {
	
	private List<String> productIds = new ArrayList<String>();
	
	public Company() {
		super();
	}

	public Company(String id, String name, String description, String imgUrl, double rating, String creatorId,
			List<String> moderators, List<String> subscribers, List<AbstractPostSpace> domains, List<String> productIds) {
		super(id, name, description, imgUrl, rating, creatorId, moderators, subscribers, domains);
		this.productIds = productIds;
	}

	public List<String> getProductIds() {
		return productIds;
	}

	public void setProductIds(List<String> productIds) {
		this.productIds = productIds;
	}
	
}
