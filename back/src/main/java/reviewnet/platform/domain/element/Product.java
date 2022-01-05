package reviewnet.platform.domain.element;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import reviewnet.platform.domain.space.AbstractPostSpace;

@Document
public class Product extends ReviewElement {
	
	private String companyId;
	
	public Product() {
		super();
	}

		
	public Product(String id, String name, String description, String imgUrl, double rating, String creatorId,
			List<String> moderators, List<String> subscribers, List<AbstractPostSpace> domains, String companyId) {
		super(id, name, description, imgUrl, rating, creatorId, moderators, subscribers, domains);
		this.companyId = companyId;
	}


	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	
}
