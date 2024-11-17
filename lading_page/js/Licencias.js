$(document).ready(function () {
    $('input').on('keypress', function (e) {
        if (e.which === 13) { 
            e.preventDefault(); 
            var inputs = $('input'); 
            var currentIndex = inputs.index(this); 
            if (currentIndex < inputs.length - 1) {
                inputs.eq(currentIndex + 1).focus(); 
            }
        }
    });

    const toggleModoOscuro = $('#modo-oscuro');

    if (localStorage.getItem('modoOscuro') === 'true') {
        $('body').addClass('modo-oscuro');
        toggleModoOscuro.prop('checked', true);
    }
    toggleModoOscuro.on('change', function () {
        if ($(this).is(':checked')) {
            $('body').addClass('modo-oscuro');
            localStorage.setItem('modoOscuro', 'true'); 
        } else {
            $('body').removeClass('modo-oscuro');
            localStorage.setItem('modoOscuro', 'false'); 
        }
    });

    $('#agregar-basica').click(function () {
        agregarLicencia('Gratis', 0, '#cantidad-basica');
    });

    $('#agregar-estandar').click(function () {
        agregarLicencia('Básica', 100000, '#cantidad-estandar');
    });

    $('#agregar-premium').click(function () {
        agregarLicencia('Premium', 150000, '#cantidad-premium');
    });

    const loginExitos = localStorage.getItem('LoginExitos');
    if (loginExitos === 'True') {
        $('#Usuario').show();
    } else {
        $('#Usuario').hide();
    }
    
    const usuario = localStorage.getItem("user");
    if (usuario) {
        $('#userUsuario').text(usuario); 
    }

    function agregarLicencia(nombre, precio, cantidadSelector) {
        let cantidad = parseInt($(cantidadSelector).val());
        let totalPorLicencia = precio * cantidad;
        let calificacion = localStorage.getItem(`calificacion-${nombre.toLowerCase()}`) || 'Sin calificar';

        let row = $('#tabla-licencias').find(`tr[data-nombre="${nombre}"]`);
        if (row.length) {
            let cantidadActual = parseInt(row.find('td:eq(2)').text()) + cantidad;
            row.find('td:eq(2)').text(cantidadActual);
            row.find('td:eq(3)').text(`$${(precio * cantidadActual).toFixed(2)}`);
            row.find('td:eq(4)').text(calificacion);
        } else {
            $('#tabla-licencias').append(` 
                <tr data-nombre="${nombre}">
                    <td>${nombre}</td>
                    <td>$${precio.toFixed(2)}</td>
                    <td>${cantidad}</td>
                    <td>$${totalPorLicencia.toFixed(2)}</td>
                    <td>${calificacion}</td>
                </tr>
            `);
        }
        actualizarTotales();
    }

    function actualizarTotales() {
        let subtotal = 0;
        $('#tabla-licencias tr').each(function () {
            let total = parseFloat($(this).find('td:eq(3)').text().substring(1));
            subtotal += total;
        });
        let iva = subtotal * 0.19;
        let total = subtotal + iva;

        $('#subtotal').text(subtotal.toFixed(2));
        $('#iva').text(iva.toFixed(2));
        $('#total').text(total.toFixed(2));
    }

    // Manejo del formulario de login
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        const usuarioInput = $('#user').val();
        const passwordInput = $('#floatingPassword').val();
    
        if (usuarioInput && passwordInput) {
            localStorage.setItem("user1", usuarioInput);
            window.location.href = "Licencias.html"; // Redirige a la página de licencias
        } else {
            alert('Por favor, completa los campos correctamente.');
        }
    });

    $('.rating span').on('click', function () {
        const $this = $(this);
        const value = $this.data('value');
        const $rating = $this.closest('.rating');
        
        $rating.find('span').removeClass('selected');
        $this.addClass('selected').prevAll().addClass('selected'); // Marca todas las estrellas hasta la seleccionada

        const licenciaTipo = $rating.data('licencia');
        localStorage.setItem(`calificacion-${licenciaTipo}`, value); // Guardar calificación en localStorage

        agregarLicenciaConCalificacion(licenciaTipo, value); // Llama una función para actualizar la tabla con la calificación
    });
});
