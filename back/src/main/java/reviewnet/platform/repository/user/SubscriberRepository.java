package reviewnet.platform.repository.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.user.Subscriber;

public interface SubscriberRepository extends MongoRepository<Subscriber, String>{

}
