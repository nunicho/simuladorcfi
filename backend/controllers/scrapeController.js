const puppeteer = require("puppeteer-core");

async function scrape(req, res) {
  try {
    const browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Ruta a tu instalación de Chrome o Chromium
    });
    const page = await browser.newPage();

    // Navegar a la página de interés
    await page.goto(
      "https://www.bna.com.ar/Home/InformacionAlUsuarioFinanciero"
    );

    // Esperar a que se cargue el contenido dinámico (puedes ajustar este tiempo según necesites)
    await page.waitForSelector("#collapseTwo");

    // Obtener la tasa de interés desde el DOM
    const tasa = await page.evaluate(() => {
      const tasaElement = document.querySelector(
        "#collapseTwo li:nth-child(2)"
      );
      return tasaElement ? tasaElement.textContent.trim() : null;
    });

    // Extraer el porcentaje de la tasa
    const tasaMatch = tasa.match(/(\d+,\d+)%/);
    const tasaOrigen = tasaMatch
      ? parseFloat(tasaMatch[1].replace(",", ".")) / 100
      : null;

    // Calcular la tasa final
    const tasaFinal = tasaOrigen ? (tasaOrigen * 0.5 + 0.02).toFixed(20) : null;

    await browser.close();

    res.json({ tasaFinal });
  } catch (error) {
    console.error("Error al realizar el scraping con Puppeteer:", error);
    res
      .status(500)
      .json({
        error: "Error al realizar el scraping con Puppeteer",
        details: error.message,
      });
  }
}

module.exports = { scrape };
