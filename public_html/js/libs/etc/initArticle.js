$(document).ready(function(){
    $.getJSON('http://localhost:8080/WebServicesProjet/webresources/article/', function(articles) {
        ko.applyBindings(new ViewModelArticle(articles));
    });
    $('#myTable').DataTable();
});