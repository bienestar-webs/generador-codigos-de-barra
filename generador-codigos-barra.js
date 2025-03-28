
// generador-codigos-barra.js
// Generador de Códigos de Barras
// Este script permite generar códigos de barras a partir de datos ingresados por el usuario.
// Se utiliza la librería JsBarcode para crear los códigos de barras en formato SVG.
// Se incluye un botón para descargar el código de barras generado como imagen PNG.






// Se utiliza un canvas para convertir el SVG a PNG y luego se descarga
function generarCodigo() {
    var datos = document.getElementById("datos").value;
    var mensaje = document.getElementById("mensaje");
    var descargarBtn = document.getElementById("descargarBtn");
    


    // Validar que los datos no contengan caracteres especiales
    // Validar que los datos no estén vacíos
    if (datos.trim() === "") {
        mensaje.innerHTML = "⚠ Por favor, ingresa datos válidos.";
        mensaje.className = "error";
        mensaje.style.display = "block";
        descargarBtn.style.display = "none";
        return;
    }




    // Generar el código de barras
    mensaje.style.display = "none";
    JsBarcode("#codigoBarras", datos, {
        format: "CODE128",
        displayValue: true,
        lineColor: "#000",
        width: 2,
        height: 50
    });
    descargarBtn.style.display = "block";
}




// Función para descargar el código de barras como imagen PNG
function descargarCodigo() {
    var datos = document.getElementById("datos").value;
    var svg = document.getElementById("codigoBarras");
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var xml = new XMLSerializer().serializeToString(svg);
    var svg64 = btoa(xml);
    var imgSrc = 'data:image/svg+xml;base64,' + svg64;
    var img = new Image();
    

    

    // Esperar a que la imagen se cargue antes de dibujarla en el canvas
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        var link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = datos.trim() !== "" ? datos + ".png" : "codigo_barras.png";
        link.click();
        

        // Mostrar mensaje de éxito
        var mensaje = document.getElementById("mensaje");
        mensaje.innerHTML = "✔ Descarga exitosa.";
        mensaje.className = "exito";
        mensaje.style.display = "block";
    };


    img.src = imgSrc;
}



// Evento para generar el código de barras al hacer clic en el botón
document.getElementById("datos").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        generarCodigo();
    }
});



