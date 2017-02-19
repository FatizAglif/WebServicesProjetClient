$(document).ready(function(){
    $.getJSON('http://localhost:8080/WebServicesProjet/webresources/users/', function(users) {
        ko.applyBindings(new ViewModelUser(users));
    });
    $('#myTable').DataTable();
});