package reviewnet.platform.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reviewnet.platform.domain.element.ReviewElement;
import reviewnet.platform.domain.space.AbstractPostSpace;
import reviewnet.platform.repository.element.ReviewElementRepository;
import reviewnet.platform.repository.space.AbstractPostSpaceRepository;

@Service
public class AbstractPostSpaceService {
	
	@Autowired
	AbstractPostSpaceRepository abstractPostRepository;
	
	@Autowired
	ReviewElementRepository reviewElementRepository;
	
	public Optional<AbstractPostSpace> getById(String id){
		return abstractPostRepository.findById(id);
	}
	
	public void addPostSpace(AbstractPostSpace postSpace) {
		abstractPostRepository.save(postSpace);
	}
	
	public void updateAbstractPostSpace(String id, AbstractPostSpace abstractPostSpace) {
        Optional<AbstractPostSpace> aps = abstractPostRepository.findById(id);

        if (aps.isPresent()) {
        	abstractPostSpace.setId(aps.get().getId());

            abstractPostRepository.save(abstractPostSpace);
        }
    }
	
	/*
	public Iterable<AbstractPostSpace> getReviewElementDomainsById(String id) {
        List<String> domainIds;
        List<AbstractPostSpace> elementDomainSet = new ArrayList<AbstractPostSpace>();
        AbstractPostSpace domain;

        Optional<ReviewElement> selectedReviewElement = reviewElementRepository.findById(id);
        domainIds = selectedReviewElement.get().getDomainIds();
        for (String domainId : domainIds) {
            domain = getById(domainId).get();
            elementDomainSet.add(domain);
        }
        return elementDomainSet;
        
    }
    */
	
	public Iterable<AbstractPostSpace> getReviewElementDomains(String id) {
        List<AbstractPostSpace> elementDomainSet = new ArrayList<AbstractPostSpace>();

        Optional<ReviewElement> selectedReviewElement = reviewElementRepository.findById(id);
        elementDomainSet = selectedReviewElement.get().getDomains();
        return elementDomainSet;
        
    }
	
}
