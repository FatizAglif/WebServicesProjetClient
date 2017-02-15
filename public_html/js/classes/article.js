/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Article = function (article) {
    this.id = ko.observable(article.id);
    this.nom = ko.observable(article.nom);
    this.description = ko.observable(article.description);
};

