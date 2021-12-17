package reviewnet.platform.domain.space;

import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ReviewSpace extends AbstractPostSpace {
	
	private double elementRatingSum;
	
	public ReviewSpace() {
	}
	
	public ReviewSpace(String id, String parentId, String name, String type, List<String> postCollection, double elementRatingSum) {
		super(id, parentId, name, type, postCollection);
		this.elementRatingSum = elementRatingSum;
	}

	public double getElementRatingSum() {
		return elementRatingSum;
	}

	public void setElementRatingSum(double elementRatingSum) {
		this.elementRatingSum = elementRatingSum;
	}

}
