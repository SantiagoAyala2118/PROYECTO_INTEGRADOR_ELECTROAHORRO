// Se selecciona el elemento del formulario para obtener los datos
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-conversion");
  const resultadoDiv = document.getElementById("resultado");

  document.getElementById("calculoMensual").addEventListener("change", () => {
    const seccion = document.getElementById("seccionMensual");
    seccion.classList.toggle("d-none", this.checked);
  });


  // Valor de consumo aproximado de cada electrodoméstico
  const electrodomesticos = {
    ventilador: 60,
    heladera: 150,
    televisor: 100,
    hornoElectrico: 1000,
    microondas: 1200,
    lavarropas: 500,
  };

  // Se evita la recarga de la pagina al apretar el botón
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Se declaran las constantes que representan los valores obtenidos del formulario
    const valor = parseFloat(document.getElementById("valor").value);
    const unidadEntrada = document.getElementById("valorIngresado").value;
    const unidadSalida = document.getElementById("valorDeSalida").value;
    const precioKWh = parseFloat(document.getElementById("precio").value);

    // Variables que cargan el resultado de la funcion de conversion
    let valorEnKWh = convertirAKWh(valor, unidadEntrada);
    let resultadoFinal;



    // Caso de si el usuario decide hacer la conversión a pesos de su consumo
    if (unidadSalida === "pesos") {
      resultadoFinal = valorEnKWh * precioKWh;
      resultadoDiv.innerHTML = `
        <div class="alert alert-success"style=
        "background-color:#ecab0f;
        color:black;
        border: solid;
        border-color:black;
        border-width:3px;
        box-shadow:2px 2px 30px 1px rgba(0, 144, 246, 0.773) ;
        ">>
          Equivale a <strong>$${resultadoFinal.toFixed(4)}</strong> (con un precio de $${precioKWh} por kWh)
        </div>
      `;

      // Caso en el que el usuario solamente quiere hacer la conversión de unidades electricas
    } else {
      resultadoFinal = convertirDesdeKWh(valorEnKWh, unidadSalida);
      resultadoDiv.innerHTML = `
        <div class="alert alert-info"
        style=
        "background-color:#ecab0f;
        color:black;
        border: solid;
        border-color:black;
        border-width:3px;
        box-shadow:2px 2px 30px 1px rgba(0, 144, 246, 0.773);
        ">
          Equivale a <strong>${resultadoFinal.toFixed(4)} ${unidadSalida}</strong>
        </div>
      `;
    }

    const calculoMensual = document.getElementById('calculoMensual').checked;
    const horasUso = parseFloat(document.getElementById('horasUso').value);

    if (calculoMensual && !isNaN(horasUso)) {
      let potenciaWatts;
      switch (unidadEntrada) {
        case "W": potenciaWatts = valor; break;
        case "kW": potenciaWatts = valor * 1000; break;
        case "Wh": potenciaWatts = valor; break;
        case "kWh": potenciaWatts = (valor * 1000) / horasUso; break;
        default: potencia = 0;
      };
      const consumoDiario = (potenciaWatts * horasUso) / 1000;
      const consumoMensual = consumoDiario * 30;
      const costoMensual = consumoMensual * precioKWh;

      resultadoDiv.innerHTML += `
    <div class="alert alert-warning mt-3"
      style="background-color:#f8e36f;
      color:black;
      border: solid;
      border-color:black;
      border-width:3px;
      box-shadow:2px 2px 30px 1px rgba(0, 144, 246, 0.773);">
      <strong>Consumo mensual estimado:</strong><br>
      • ${consumoMensual.toFixed(2)} kWh/mes<br>
      • $${costoMensual.toFixed(2)} por mes
    </div>
  `;

    };

  });
  // Evento para cuando el usuario elige calcular el consumo de un electrodoméstico
  document.getElementById('electrodomesticos').addEventListener('change', (e) => {
    const seleccion = e.target.value;
    const potencia = electrodomesticos[seleccion];

    if (potencia) {
      valor.value = potencia;
      unidadEntrada.value = "W";
    };
  });




  // Convierte cualquier unidad a kWh
  function convertirAKWh(valor, unidad) {
    switch (unidad) {
      case "W": return (valor / 1000) * 1;       // W a kWh asumiendo 1h
      case "kW": return valor * 1;                // kW a kWh asumiendo 1h
      case "Wh": return valor / 1000;
      case "kWh": return valor;
      default: return 0;
    }
  }

  // Convierte desde kWh a otra unidad
  function convertirDesdeKWh(valorKWh, unidad) {
    switch (unidad) {
      case "W": return valorKWh * 1000;
      case "kW": return valorKWh;
      case "Wh": return valorKWh * 1000;
      case "kWh": return valorKWh;
      default: return 0;
    }
  }
});

// Evento del boton de reiniciar la calculadora
let botonReiniciar = document.getElementById('reiniciar');
botonReiniciar.addEventListener('reset', (e) => {
  location.reload();
})
