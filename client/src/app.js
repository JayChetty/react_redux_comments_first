var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require('./components/CommentBox.jsx');
var CommentRestAdapter = require('./comment_rest_adapter')

var accountsStore = require('./store');
var url = "/api/comments";

var commentRestAdapter = new CommentRestAdapter(url, accountsStore);

var render = function(){
  console.log("state", accountsStore.getState())
  ReactDOM.render(
    <CommentBox>
      data= {accountsStore.getState()}
      onCommentSubmit= { function(comment){
        //optimistic load
        accountsStore.dispatch({
          type:'ADD_COMMENT',
          comment: comment
        })
        commentRestAdapter.postComment(comment);
      }}
    <CommentBox/>,
    document.getElementById('app')
  );
}


accountsStore.subscribe(render);
window.onload = function(){
 render();
 commentRestAdapter.fetchComments();
}
