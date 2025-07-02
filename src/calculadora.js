document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-conversion");
  const resultadoDiv = document.getElementById("resultado");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const valor = parseFloat(document.getElementById("valor").value);
    const unidadEntrada = document.getElementById("valorIngresado").value;
    const unidadSalida = document.getElementById("valorDeSalida").value;
    const precioKWh = parseFloat(document.getElementById("precio").value);

    let valorEnKWh = convertirAKWh(valor, unidadEntrada);
    let resultadoFinal;

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
  });

  // Convierte cualquier unidad a kWh
  function convertirAKWh(valor, unidad) {
    switch (unidad) {
      case "W":   return (valor / 1000) * 1;       // W a kWh asumiendo 1h
      case "kW":  return valor * 1;                // kW a kWh asumiendo 1h
      case "Wh":  return valor / 1000;
      case "kWh": return valor;
      default:    return 0;
    }
  }

  // Convierte desde kWh a otra unidad
  function convertirDesdeKWh(valorKWh, unidad) {
    switch (unidad) {
      case "W":   return valorKWh * 1000;
      case "kW":  return valorKWh;
      case "Wh":  return valorKWh * 1000;
      case "kWh": return valorKWh;
      default:    return 0;
    }
  }
});

let botonReiniciar = document.getElementById('reiniciar');
botonReiniciar.addEventListener('reset', (e) => {
  location.reload();
})
