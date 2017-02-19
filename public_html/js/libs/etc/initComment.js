$(document).ready(function(){
    $.getJSON('http://localhost:8080/WebServicesProjet/webresources/comment/', function(comments) {
        ko.applyBindings(new ViewModelComment(comments));
    });
    $('#myTable').DataTable();
});