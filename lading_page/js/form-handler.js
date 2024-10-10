document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Evita el envío normal del formulario

    // Obtiene los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;

    // Inserta los valores en la tabla
    const formDataTable = document.getElementById('formData');
    formDataTable.innerHTML = `
        <tr>
            <td>${nombre}</td>
            <td>${email}</td>
            <td>${asunto}</td>
            <td>${mensaje}</td>
        </tr>
    `;
    // Muestra la tabla
    document.getElementById('tableSection').style.display = 'block';

    // Limpia el formulario
    document.getElementById('contactForm').reset();
});