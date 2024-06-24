document.addEventListener("DOMContentLoaded", async () => {
  // Función para obtener la tasa de interés
  const obtenerTasaInteres = async () => {
    try {
      //const response = await fetch("/scrape");
      const response = await fetch("https://simuladorcfi.netlify.app/scrape");
      const data = await response.json();
      console.log(data)
      const tasaFinal = data.tasaFinal;
      return tasaFinal * 100; // Asume que la tasa es en porcentaje
    } catch (error) {
      console.error("Error al obtener la tasa de interés:", error);
      return null;
    }
  };

  // Establecer la tasa de referencia en el div correspondiente
  const tasaInteres = await obtenerTasaInteres();
  const tasaValorElement = document.getElementById("tasa-valor");
  if (tasaInteres !== null) {
    tasaValorElement.textContent = tasaInteres.toFixed(10);
    document.getElementById("interes").value = (tasaInteres / 12).toFixed(10); // Dividir la tasa mensual por 12
  } else {
    tasaValorElement.textContent = "Error al obtener la tasa";
  }

  // Función para calcular el cronograma de amortización
  const calcularCronograma = () => {
    const monto = parseFloat(document.getElementById("monto").value);
    const tiempo = parseInt(document.getElementById("tiempo").value);
    const plazoGracia = parseInt(document.getElementById("gracia").value);
    const interes = parseFloat(document.getElementById("interes").value) / 100;

    if (
      isNaN(monto) ||
      isNaN(tiempo) ||
      isNaN(interes) ||
      monto <= 0 ||
      tiempo <= 0 ||
      interes <= 0
    ) {
      document.getElementById("alert-error").hidden = false;
      return;
    } else {
      document.getElementById("alert-error").hidden = true;
    }

    const tabla = document
      .getElementById("lista-tabla")
      .getElementsByTagName("tbody")[0];
    tabla.innerHTML = "";

    const cuotaFija = monto / tiempo;
    let saldo = monto;
    let fecha = dayjs();

    for (let i = 0; i < tiempo; i++) {
      let amortizacion = 0;
      let interesCuota = 0;
      let cuota = 0;

      if (i >= plazoGracia) {
        amortizacion = cuotaFija;
        interesCuota = saldo * interes;
        cuota = amortizacion + interesCuota;
        saldo -= amortizacion;
      } else {
        interesCuota = saldo * interes;
        cuota = interesCuota;
      }

      const fila = tabla.insertRow();
      fila.insertCell(0).textContent = fecha
        .add(i, "month")
        .format("DD/MM/YYYY");
      fila.insertCell(1).textContent = amortizacion.toFixed(2);
      fila.insertCell(2).textContent = interesCuota.toFixed(2);
      fila.insertCell(3).textContent = cuota.toFixed(2);
      fila.insertCell(4).textContent = saldo.toFixed(2);
    }
  };

  // Asignar evento al botón de calcular
  document
    .getElementById("btnCalcular")
    .addEventListener("click", calcularCronograma);
});
