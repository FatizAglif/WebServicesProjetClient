var ViewModelArticle = function (articles) {
    var self = this;
    this.filter = ko.observable();
    
    self.comments = function (article) {
        document.location.href = "ListeComments.html?article="+ko.toJS(article.id);
    };
    
    self.articles = ko.observableArray(ko.utils.arrayMap(articles, function (article) {
        return new Article(article);
    }));
    
    self.currentFilter = ko.observable();
    
    self.filterArticles = ko.computed(function() {
       if(!self.filter()) {
           return self.articles();
       } else {
           return ko.utils.arrayFilter(self.articles(), function(article) {
              var articleTitre = ko.toJS(article.title);
              var articleKeywords = ko.toJS(article.keywords);
              var articleContent = ko.toJS(article.content);
              var articleDate = new Date(ko.toJS(article.published_on)).toISOString().split('T')[0];
              console.log(articleDate);
              return articleTitre.toLowerCase().includes(self.filter().toLowerCase()) || articleKeywords.toLowerCase().includes(self.filter().toLowerCase())
               || articleContent.toLowerCase().includes(self.filter().toLowerCase());
           });
       }
    });
    
    self.add = function () {
        self.articles.push({
            id : "",
            title : "",
            keywords : "",
            published_on : "",
            content : "",
            photo : "",
            position_longitude : "",
            position_latitude : "",
            position_name : "",
            status : "",
            user : ""
        });
    };

    self.remove = function (article) {
        self.articles.remove(article);
        $.ajax({
            url: ["http://localhost:8080/WebServicesProjet/webresources/article/"+ko.toJS(article.id)],
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept : "application/json"
            }
        });
    };
    self.update = function (article) {
        // Si l'id de la Categorie n'est pas reconnu alors on l'ajout Sinon on le met a jour.
        if(ko.toJS(article.id) === "") {
            $.ajax({
                url: ["http://localhost:8080/WebServicesProjet/webresources/article/"],
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    id : ko.toJS(article.id),
                    title : ko.toJS(article.titre),
                    keywords : ko.toJS(article.keywords),
                    published_on : ko.toJS(article.published_on),
                    content : ko.toJS(article.content),
                    photo : ko.toJS(article.photo),
                    position_longitude : ko.toJS(article.position_longitude),
                    position_latitude : ko.toJS(article.position_latitude),
                    position_name : ko.toJS(article.position_name),
                    status : ko.toJS(article.status),
                    user : ko.toJS(article.user)
                }
            });
            window.location.reload();
        } else {
            self.articles.replace(self.articles[ko.toJS(article.id)], article);
            $.ajax({
                url: ["http://localhost:8080/WebServicesProjet/webresources/article/"+ko.toJS(article.id)],
                type: "PUT",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    title : ko.toJS(article.title),
                    keywords : ko.toJS(article.keywords),
                    published_on : ko.toJS(article.published_on),
                    content : ko.toJS(article.content),
                    photo : ko.toJS(article.photo),
                    position_longitude : ko.toJS(article.position_longitude),
                    position_latitude : ko.toJS(article.position_latitude),
                    position_name : ko.toJS(article.position_name),
                    status : ko.toJS(article.status),
                    user : ko.toJS(article.user)
                }
            });
        }
    };
};