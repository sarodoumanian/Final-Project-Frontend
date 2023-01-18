import './post.css';
import { MoreVert, ThumbUpOutlined, ThumbUpAlt } from '@material-ui/icons';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { COMMENT, LIKE } from '../../graphql/mutation';
import moment from 'moment';
import { useEffect } from 'react';

export default function Post({ post }) {
  const text = post.title;
  const [textToShow, setTextToShow] = useState(text.length > 150 ? text.substring(0, 150) : text);
  const [showComments, setShowComments] = useState(false);
  const [showShowLess, setShowShowLess] = useState(textToShow.length > 150);
  const [showShowMore, setShowShowMore] = useState(text.length > 150);
  const [showLikes, setShowLikes] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [likeNames, setLikeNames] = useState(post.likes);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(!!post.likes.find((like) => like.user.id == JSON.parse(localStorage.getItem('user')).id));

  const [like] = useMutation(LIKE, {
    fetchPolicy: 'no-cache'
  });

  const [commentFn] = useMutation(COMMENT, {
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    setComments(post.comments.reverse());
  }, []);

  const showMore = () => {
    setTextToShow(text);
    setShowShowLess(true);
    setShowShowMore(false);
  };

  const showLess = () => {
    setTextToShow(text.substring(0, 150));
    setShowShowMore(true);
    setShowShowLess(false);
  };

  const displayCommentHandler = () => {
    setShowComments((prevValue) => !prevValue);
  };

  const likeHandler = () => {
    like({
      variables: {
        id: post.id
      }
    })
      .then((res) => {
        if (res.data.like.message === 'liked') {
          setIsLiked(true);
          setLikes(likes + 1);
          const newLikeName = {
            user: {
              firstName: JSON.parse(localStorage.getItem('user')).firstName,
              lastName: JSON.parse(localStorage.getItem('user')).lastName
            }
          };
          setLikeNames([newLikeName, ...likeNames]);
        } else {
          setLikes(likes - 1);
          setIsLiked(false);
          setLikeNames((prevItems) =>
            prevItems.filter((i) => i.user.firstName !== JSON.parse(localStorage.getItem('user')).firstName && i.user.lastName !== JSON.parse(localStorage.getItem('user')).lastName)
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const commentHandler = (e) => {
    e.preventDefault();
    console.log(comment);
    commentFn({
      variables: {
        id: post.id,
        text: comment
      }
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.comment);
        setComments([...comments, res.data.comment]);
        e.target.cmnt.value = '';
        setComment('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={`http://localhost:4000/profilePictures/${post.owner.profilePic}`} alt="" />
            <span className="postUsername">{post.owner.firstName + ' ' + post.owner.lastName}</span>
            {post.owner.role === 'admin' && <span className="admin">Admin</span>}
            {post.owner.role === 'superAdmin' && <span className="admin">Super Admin</span>}

            <span className="postDate">{moment(new Date(+post.createdAt)).fromNow()}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <p>Catagory: {post.catagory}</p>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {/* {post.title.length > 150 ? post.title.substring(0, 150) : post.title} */}
            {textToShow}
            {showShowMore && (
              <span className="showmore" onClick={showMore}>
                ...Show more
              </span>
            )}
            {showShowLess && (
              <span className="showmore" onClick={showLess}>
                ...Show less
              </span>
            )}
          </p>

          <img className="postImg" src={`http://localhost:4000/posts/${post.image}`} alt="" />
        </div>

        {post.status === 'approved' ? (
          <div className="postBottom">
            <div className="postBottomLeft">
              <button value={post.id} className="imageButton" onClick={likeHandler}>
                {isLiked ? <ThumbUpAlt /> : <ThumbUpOutlined />}
              </button>
              {showLikes && (
                <div className="tooltip">
                  {likeNames.map((l, i) => (
                    <p key={i + 1}>
                      {l.user.firstName} {l.user.lastName}
                    </p>
                  ))}
                </div>
              )}
              <span className="postLikeCounter" onMouseEnter={() => setShowLikes(true)} onMouseLeave={() => setShowLikes(false)}>
                {likes !== 0 && likes}
              </span>
            </div>
            <div className="postBottomRight" onClick={displayCommentHandler}>
              <span className="postCommentText">{post.comments.length !== 0 ? post.comments.length + ' comments' : 'comment'}</span>
            </div>
          </div>
        ) : (
          <div>This post is not approved by admins yet</div>
        )}
        {post.status === 'approved' && showComments && (
          <div>
            {comments.length > 0 && (
              <div className="comments-list">
                {comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <img src={`http://localhost:4000/profilePictures/${comment.user.profilePic}`} title={comment.user.firstName} alt="" className="comment-photo" />
                    <div className="comment-content">
                      <div className="comment-date">{moment(new Date(+comment.createdAt)).fromNow()}</div>
                      <div className="comment-text">{comment.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <form className="input-container" onSubmit={commentHandler}>
              <input name="cmnt" id="cmnt" type="text" placeholder="Add a comment..." className="input-field" autoComplete="off" onChange={(e) => setComment(e.target.value)} />
              <button className="input-button" type="submit" disabled={!comment}>
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// {post.comments.length > 0 && showComments && (
//   <ul style={{ display: 'block' }}>
//     {post.comments.map((comment) => (
//       <li key={comment.id}>{comment.text}</li>
//     ))}
//   </ul>
// )}
