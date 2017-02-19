var ViewModelUser = function (users) {
    var self = this;
    this.filter = ko.observable();
    
    self.users = ko.observableArray(ko.utils.arrayMap(users, function (user) {
        return new Users(user);
    }));
    
    self.currentFilter = ko.observable();
    
    self.filterUsers = ko.computed(function() {
       if(!self.filter()) {
           return self.users();
       } else {
           return ko.utils.arrayFilter(self.users(), function(user) {
              var userLastname = ko.toJS(user.lastname);
              var userFirstname = ko.toJS(user.firstname);
              var userLogin = ko.toJS(user.username);
              return userLastname.toLowerCase().includes(self.filter().toLowerCase()) || userFirstname.toLowerCase().includes(self.filter().toLowerCase())
               || userLogin.toLowerCase().includes(self.filter()).toLowerCase();
           });
       }
    });
    
    self.add = function () {
        self.users.push({
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

    self.remove = function (user) {
        self.users.remove(user);
        $.ajax({
            url: ["http://localhost:8080/WebServicesProjet/webresources/users/"+ko.toJS(user.id)],
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept : "application/json"
            }
        });
    };
    self.update = function (user) {
        // Si l'id de l'User n'est pas reconnu alors on l'ajout Sinon on le met a jour.
        if(ko.toJS(user.id) === "") {
            $.ajax({
                url: ["http://localhost:8080/WebServicesProjet/webresources/users/"],
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    id : ko.toJS(user.id),
                    firstname : ko.toJS(user.firstname),
                    lastname : ko.toJS(user.lastname),
                    about : ko.toJS(user.about),
                    photo : ko.toJS(user.photo),
                    username : ko.toJS(user.username),
                    password : ko.toJS(user.password),
                    last_connected : ko.toJS(user.last_connected),
                    userStatus : ko.toJS(user.userStatus),
                    role : ko.toJS(user.role)
                }
            });
            window.location.reload();
        } else {
            self.users.replace(self.users[ko.toJS(user.id)], user);
            $.ajax({
                url: ["http://localhost:8080/WebServicesProjet/webresources/users/"+ko.toJS(user.id)],
                type: "PUT",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    firstname : ko.toJS(user.firstname),
                    lastname : ko.toJS(user.lastname),
                    about : ko.toJS(user.about),
                    photo : ko.toJS(user.photo),
                    username : ko.toJS(user.username),
                    password : ko.toJS(user.password),
                    last_connected : ko.toJS(user.last_connected),
                    userStatus : ko.toJS(user.userStatus),
                    role : ko.toJS(user.role)
                }
            });
        }
    };
};