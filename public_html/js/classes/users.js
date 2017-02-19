var Users = function (user) {
    this.id = ko.observable(user.id);
    this.firstname = ko.observable(user.firstname);
    this.lastname = ko.observable(user.lastname);
    this.about = ko.observable(user.about);
    this.photo = ko.observable(user.photo);
    this.username = ko.observable(user.username);
    this.password = ko.observable(user.password);
    this.last_connected = ko.observable(new Date(user.last_connected).toISOString().split('T')[0]);
    this.userStatus = ko.observable(user.userStatus);
    if(user.role!==null){
        this.role = ko.observable(user.role.name);
    }else{
        this.role = ko.observable(user.role);
    }
};