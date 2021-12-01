package reviewnet.platform.repository.post;

import org.springframework.data.mongodb.repository.MongoRepository;

import reviewnet.platform.domain.post.Reply;

public interface ReplyRepository extends MongoRepository<Reply, String>{

}
