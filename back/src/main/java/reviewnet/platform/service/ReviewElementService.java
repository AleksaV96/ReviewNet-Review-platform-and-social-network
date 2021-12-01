package reviewnet.platform.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.repository.element.ReviewElementRepository;

@Service
public class ReviewElementService {
	
	@Autowired
	ReviewElementRepository reviewElementRepository;
	
	public Iterable<ReviewElement> getAll() {
		return reviewElementRepository.findAll();
	}
	
	public Optional<ReviewElement> getById(String id){
		return reviewElementRepository.findById(id);
	}
	
	public Optional<ReviewElement> findByName(String name){
		return reviewElementRepository.findByName(name);
	}
	
	public void addElement(ReviewElement element) {
		reviewElementRepository.save(element);
	}
	
	public void removeElement(String id) {
		Optional<ReviewElement> element = reviewElementRepository.findById(id);
		reviewElementRepository.delete(element.get());
	}
}
