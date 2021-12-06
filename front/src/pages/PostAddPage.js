import PostForm from "../components/forms/PostForm";
import ReviewPostForm from "../components/forms/ReviewPostForm";

;

function PostAddPage(props) {

    let address;
    let type;

    props.domain.map((domain) => (
        address = 'http://localhost:8080/posts/' + domain.type + 'Id/' + domain.id + '/addpost'
    ))

    props.domain.map((domain) => (
        type = domain.type
    ))
    

    function addPostHandler(postData) {

    fetch(
        address,
        {
         method: 'POST',
         body: JSON.stringify(postData),
         headers: {
             'Content-Type': 'application/json',
        },
        credentials: 'include'
        },
     
        window.location.reload(),
     
        )
    }
     

        if(type!=="reviewSpace") {
        return(
            <PostForm onPostAdd={addPostHandler} />
        );
        }
        return(
            <ReviewPostForm onPostAdd={addPostHandler} />
        );
}

export default PostAddPage;