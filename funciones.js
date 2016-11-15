 function cambiarPagina(page) {

        $.mobile.changePage("#" + page, {
            transition: "none"
        });

    }
    var nombresHotel = [];
   
$(document).ready(function(){
	
	
	var id;
	var mapaRegistro;
	var marcadorRegistro;
	var latitudPunto;
    var longitudPunto;
	var latlngInicial = new google.maps.LatLng(18.417640, -68.966264);
	$(".btnRegistrar").click(function(){
		cambiarPagina("RegistrarHotel");
		mostrarMapaRegistro();
	})
	$(".guardarHotel").click(function(){
		id = nombresHotel.length;
		hotel = {
			id: 		id,
			nombre:   $("#nombre").val(),
			ciudad:   $("#ciudad").val(),
			telefono: $("#telefono").val(),
			estrella:  $("#estrellas").val(),
			latitud: latitudPunto,
            longitud: longitudPunto   
		};
		nombresHotel.push(hotel);
		$("#nombre").val("");
		$("#ciudad").val("");
		$("#telefono").val("");
		$("#estrellas").val("");
		 marcadorRegistro.setPosition(latlngInicial);
            mapaRegistro.setCenter(latlngInicial);
            alert("hotel registrado");

	})
	function mostrarMapaRegistro() {
           var opciones = {            
                zoom: 7,
                center: latlngInicial,
                mapTypeId: google.maps.MapTypeId.ROADMAP        
            };
            mapaRegistro = new google.maps.Map(document.getElementById("MapaRegistro"), opciones);   
             marcadorRegistro = new google.maps.Marker({            
                position: latlngInicial,
                map: mapaRegistro,
                draggable: true,
                title: "Mi punto!!"        
            });

            google.maps.event.addListener(marcadorRegistro, 'dragend', function(event) {
                latitudPunto = event.latLng.lat();
                longitudPunto = event.latLng.lng();
            });
    }
    function mostrar()    {
    	var lista ="";
    	var valor;
    	for (var i = nombresHotel.length - 1; i >= 0; i--) {
    		
    		lista +="<a class='ui-btn' onclick='abrirhotel("+i+")'>"
    		lista += nombresHotel[i].nombre;
    		lista += "</a>"
    		$("#lista").html(lista);
    		
    	};
    }
    $(".btnVerHoteles").click(function(){
    	cambiarPagina("allHotel");
    	mostrar()

    });

    
})
  function abrirhotel(hotel)
    {
     
      cambiarPagina("unidad");
      for (var i = nombresHotel.length - 1; i >= 0; i--) {
          if (i===hotel) {
           $("#nombreHotel").html(nombresHotel[i].nombre);
           $("#ciudadHotel").html(nombresHotel[i].ciudad);
           $("#telefonoHotel").html(nombresHotel[i].telefono);
           $("#estrellasHotel").html(nombresHotel[i].estrella);
           var posicion = new google.maps.LatLng(nombresHotel[i].latitud, nombresHotel[i].longitud); 
           var opciones = {            
                zoom: 10,
                center: posicion,
                mapTypeId: google.maps.MapTypeId.ROADMAP        
            };
            mapaRegistro = new google.maps.Map(document.getElementById("mapaIndependiente"), opciones);   
             marcadorRegistro = new google.maps.Marker({            
                position: posicion,
                map: mapaRegistro,
                draggable: false,
                title: nombresHotel[i].nombre
            });

          


          }
      };

    }