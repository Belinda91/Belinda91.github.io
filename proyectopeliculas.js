var numpelis = 0;
var tipo = "";

$(document).ready(function(){
    $("#peliculas").click(function(){
        tipo = "&type=movie";
        busca();
        sacaResultado(tipo);
    });
    $("#series").click(function(){
        tipo = "&type=series";
        busca();
        sacaResultado(tipo);
    });
    $("#juegos").click(function(){
        tipo = "&type=game";
        busca();
        sacaResultado(tipo);
    });
    
$("#buscar").click(function(){
    tipo = "";
    busca();
    let cosa = $("input").val();
    $.getJSON("http://www.omdbapi.com/?apikey=11ca67af&s="+cosa, function(pelis){
        for (peli of pelis.Search){
            metePeliculas(peli);
        }
    });
});

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= $(document).height()-10) {
        sacaResultado();
    }
});
    
});

function sacaResultado(){
    numpelis++;
    let buscar = $("input").val();
    $.getJSON("http://www.omdbapi.com/?apikey=11ca67af&s="+buscar+"&page="+numpelis+tipo, function(pelis){
        for (peli of pelis.Search){
            metePeliculas(peli);
        }
    });
}
function busca(){
    numpelis=0;
    $("#biblioteca").empty();
}

function metePeliculas(pelis){
    imgvacia(pelis);
    $("#biblioteca").append($("<div id='ficha'><img src="+pelis.Poster+"><p>"+pelis.Title+"</p><p>"+pelis.Year+"</p></div>"));
}

function imgvacia(peli) {
    if (peli.Poster == "N/A") {
        peli.Poster = "imagenes/Sin_imagen_disponible.jpg";
    }
}