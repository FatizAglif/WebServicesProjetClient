var ViewModelRole = function (roles) {
    var self = this;
    this.filter = ko.observable();
    
    self.roles = ko.observableArray(ko.utils.arrayMap(roles, function (role) {
        return new Role(role);
    }));
    
    self.currentFilter = ko.observable();
    
    self.filterRoles = ko.computed(function() {
       if(!self.filter()) {
           return self.roles();
       } else {
           return ko.utils.arrayFilter(self.roles(), function(role) {
              var roleName = ko.toJS(role.name);
              var roleDescription = ko.toJS(article.description);
              return roleName.toLowerCase().includes(self.filter().toLowerCase()) || roleDescription.toLowerCase().includes(self.filter().toLowerCase());
           });
       }
    });
    
    self.add = function () {
        self.roles.push({
            id : "",
            name : "",
            description : ""
        });
    };

    self.remove = function (role) {
        self.roles.remove(role);
        $.ajax({
            url: ["http://localhost:8080/WebServicesProjet/webresources/role/"+ko.toJS(role.id)],
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept : "application/json"
            }
        });
    };
    self.update = function (role) {
        // Si l'id de le Role n'est pas reconnu alors on l'ajout Sinon on le met a jour.
        if(ko.toJS(role.id) === "") {
            $.ajax({
                url: ["http://localhost:8080/WebServicesProjet/webresources/role/"],
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    id : ko.toJS(role.id),
                    name : ko.toJS(role.name),
                    description : ko.toJS(role.description)
                }
            });
            window.location.reload();
        } else {
            self.roles.replace(self.roles[ko.toJS(role.id)], role);
            $.ajax({
                url: ["http://localhost:8080/WebServicesProjet/webresources/role/"+ko.toJS(role.id)],
                type: "PUT",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    name : ko.toJS(role.name),
                    description : ko.toJS(role.description)
                }
            });
        }
    };
};