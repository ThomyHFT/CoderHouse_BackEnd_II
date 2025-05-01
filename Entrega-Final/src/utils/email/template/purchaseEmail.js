export const purchaseEmail = (code, amount, purchase_datetime, purchaser) => {
    return `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Confirmación de Compra - Ticket</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #e9ecef;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 650px;
        margin: auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #007A78;
        color: white;
        text-align: center;
        padding: 30px 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
      }
      .body {
        padding: 30px 40px;
        color: #333;
      }
      .body p {
        font-size: 16px;
        margin: 15px 0;
      }
      .body .highlight {
        font-weight: bold;
        color: #007A78;
      }
      .ticket-info {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        margin-top: 20px;
      }
      .ticket-info p {
        margin: 8px 0;
        font-size: 15px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 13px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🎟️ ¡Gracias por tu compra!</h1>
      </div>
      <div class="body">
        <p>Hola <span class="highlight">${purchaser}</span>,</p>
        <p>Tu transacción ha sido completada con éxito. A continuación encontrarás los detalles de tu compra:</p>
        <div class="ticket-info">
          <p><strong>Código del Ticket:</strong> ${code}</p>
          <p><strong>Fecha de Compra:</strong> ${new Date(purchase_datetime).toLocaleString("es-CL")}</p>
          <p><strong>Total Pagado:</strong> $${amount.toLocaleString("es-CL")}</p>
          <p><strong>Comprador:</strong> ${purchaser}</p>
        </div>
      </div>
      <div class="footer">
        <p>Este ticket fue generado automáticamente. No es necesario responder a este mensaje.</p>
        <p>Si tienes dudas, contáctanos a soporte@example.com</p>
      </div>
    </div>
  </body>
  </html>`;
  };
  