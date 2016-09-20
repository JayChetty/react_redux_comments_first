var CommentRestAdapter = function(url, store){
  this.url = url;
  this.store = store;
}

CommentRestAdapter.prototype = {
  // updateStoreFromString = function(dataString)
  fetchComments: function(){
      var request = new XMLHttpRequest();
      request.open("GET", this.url);
      request.onload = function(){
        if(request.status === 200){
          var data = JSON.parse(request.responseText);
          this.store.dispatch({
            type:'REFRESH_COMMENTS',
            comments: data
          })
        }
      }.bind(this)
      request.send(null);
  },

  postComment: function(comment){
    var request = new XMLHttpRequest();
    request.open("POST", this.url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
      if(request.status === 200){
        var data = JSON.parse(request.responseText);
        this.store.dispatch({
          type:'REFRESH_COMMENTS',
          comments: data
        })
      }
    }.bind(this)
    request.send( JSON.stringify(comment) );
  }
}

module.exports = CommentRestAdapter
