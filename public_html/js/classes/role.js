var Role = function (role) {
    this.id = ko.observable(role.id);
    this.name = ko.observable(role.name);
    this.description = ko.observable(role.description);
};

