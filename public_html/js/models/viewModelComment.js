var ViewModelComment = function (comments) {
    var self = this;
    this.filter = ko.observable();
    
    self.comments = ko.observableArray(ko.utils.arrayMap(comments, function (comment) {
        return new Comment(comment);
    }));
    
    self.currentFilter = ko.observable();
    
    self.filterComments = ko.computed(function() {
       if(!self.filter()) {
           return self.comments();
       } else {
           return ko.utils.arrayFilter(self.comments(), function(comment) {
              var commentaire = ko.toJS(comment.comment);
              return commentaire.toLowerCase().includes(self.filter().toLowerCase());
           });
       }
    });
    
    self.add = function () {
        self.comments.push({
            id : "",
            comment : "",
            commented_date : "",
            user : "",
            article : ""
        });
    };

    self.remove = function (comment) {
        self.comments.remove(comment);
        $.ajax({
            url: ["http://localhost:8080/WebServicesProjet/webresources/comment/"+ko.toJS(comment.id)],
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept : "application/json"
            }
        });
    };
    self.update = function (comment) {
        // Si l'id du commentaire n'est pas reconnu alors on l'ajout Sinon on le met a jour.
        if(ko.toJS(comment.id) === "") {
            $.ajax({
                url: ["http://localhost:8080/WebServicesProjet/webresources/comment/"],
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    id : ko.toJS(comment.id),
                    comment : ko.toJS(comment.comment),
                    commented_date : ko.toJS(comment.commented_date),
                    user : ko.toJS(comment.user),
                    article : ko.toJS(comment.article)
                }
            });
            window.location.reload();
        } else {
            self.comments.replace(self.comments[ko.toJS(comment.id)], comment);
            $.ajax({
                url: ["http://localhost:8080/WebServicesProjet/webresources/comment/"+ko.toJS(comment.id)],
                type: "PUT",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    comment : ko.toJS(comment.comment),
                    commented_date : ko.toJS(comment.commented_date),
                    user : ko.toJS(comment.user),
                    article : ko.toJS(comment.article)
                }
            });
        }
    };
};