var Article = function (article) {
    this.id = ko.observable(article.id);
    this.title = ko.observable(article.title);
    this.keywords = ko.observable(article.keywords);
    this.published_on = ko.observable(new Date(article.published_on).toISOString().split('T')[0]);
    this.content = ko.observable(article.content);
    this.photo = ko.observable(article.photo);
    this.position_longitude = ko.observable(article.position_longitude);
    this.position_latitude = ko.observable(article.position_latitude);
    this.position_name = ko.observable(article.position_name);
    this.status = ko.observable(article.status);
    if(article.user !== null) {
        this.user = ko.observable(article.user.username);
    } else {
        this.user = ko.observable(article.user);
    }
};