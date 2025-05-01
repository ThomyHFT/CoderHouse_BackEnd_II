export const registerEmail = (fullName, email) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4; color: #333; border-radius: 10px;">
      <div style="background-color: #007A78; padding: 15px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
        <h1>¡Bienvenido, ${fullName}!</h1>
      </div>
      <div style="background-color: white; padding: 20px; border-radius: 0 0 10px 10px;">
        <p>Nos alegra tenerte con nosotros. Tu cuenta ha sido registrada exitosamente con el correo:</p>
        <p style="font-weight: bold; color: #007A78;">${email}</p>
        <p>Ahora puedes comenzar a disfrutar de todos los beneficios de nuestra plataforma.</p>
        <hr style="margin: 20px 0;">
        <p style="font-size: 14px; color: #777;">Si no realizaste este registro, por favor ignora este correo.</p>
      </div>
    </div>
    `;
  };
  