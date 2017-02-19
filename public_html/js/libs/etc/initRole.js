$(document).ready(function(){
    $.getJSON('http://localhost:8080/WebServicesProjet/webresources/role/', function(roles) {
        ko.applyBindings(new ViewModelRole(roles));
    });
    $('#myTable').DataTable();
});