var Comment = function (comment) {
    this.id = ko.observable(comment.id);
    this.comment = ko.observable(comment.comment);
    this.commented_date = ko.observable(new Date(comment.commented_date).toISOString().split('T')[0]);
    if(comment.user!==null){
        this.user = ko.observable(comment.user.username);
    } else{
        this.user = ko.observable(comment.user);
    }
    if(comment.article!==null){
        this.article = ko.observable(comment.article.title);
    }else{
        this.article = ko.observable(comment.article);
    }
};