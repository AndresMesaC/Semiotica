$(document).ready(function () {
    $('input').on('keypress', function (e) {
        if (e.which === 13) { // 13 es el código de la tecla Enter
            e.preventDefault(); // Evita el comportamiento predeterminado de "submit"
            var inputs = $('input'); // Selecciona todos los campos de entrada
            var currentIndex = inputs.index(this); // Encuentra el índice del campo actual
            if (currentIndex < inputs.length - 1) {
                inputs.eq(currentIndex + 1).focus(); // Mueve el foco al siguiente campo
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
            localStorage.setItem('modoOscuro', 'true'); // Guardar preferencia en localStorage
        } else {
            $('body').removeClass('modo-oscuro');
            localStorage.setItem('modoOscuro', 'false'); // Guardar preferencia en localStorage
        }
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

    const today = new Date().toISOString().split("T")[0];
    $("#FechaNac").attr("max", today);

    $('#FechaNac').on('change', function () {
        const birthDate = new Date($(this).val());
        const age = calculateAge(birthDate);
        $('#Edad').val(age >= 0 ? age : ''); 
        enableRegisterButton(); 
    });

    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--; 
        }
        return age;
    }

    function generateUsername() {
        const nombre = $('#Nombre').val().trim().toLowerCase();
        const apellido = $('#Apellido').val().trim().toLowerCase();
        const birthDate = new Date($('#FechaNac').val());
        if (nombre && apellido && !isNaN(birthDate)) {
            const day = String(birthDate.getDate()).padStart(2, '0');
            const month = String(birthDate.getMonth() + 1).padStart(2, '0');
            const year = birthDate.getFullYear();
            $('#User').val(`${nombre[0]}${apellido}${day}${month}${year}`);
        } else {
            $('#User').val(''); 
        }
    }

    $('#FechaNac, #Nombre, #Apellido').on('change keyup', generateUsername);
    function enableRegisterButton() {
        const age = parseInt($('#Edad').val(), 10);
        if (age >= 18) {
            $('#btn-register').prop('disabled', false); 
        } else {
            $('#btn-register').prop('disabled', true); 
        }
    }

    $('#btn-register').click(function (e) {
        e.preventDefault();

        const nombre = $('#Nombre').val();
        const apellido = $('#Apellido').val();
        const correo = $('#Correo').val();
        const password = $('#password').val();
        const confirmPassword = $('#ValidPassword').val();
        
        const soloLetras = /^[A-Za-z]+$/;
        let isValid = true;

        $(".error").remove(); 
        $('input').css('border-color', ''); 

        if (!nombre) {
            isValid = false;
            $('#Nombre').after('<span class="error" style="color:red;">El nombre no puede estar vacío.</span>');
            $('#Nombre').css('border-color', 'red');
        } else if (!soloLetras.test(nombre)) {
            isValid = false;
            $('#Nombre').after('<span class="error" style="color:red;">El nombre solo debe contener letras.</span>');
            $('#Nombre').css('border-color', 'red');
        }
        
        if (!apellido) {
            isValid = false;
            $('#Apellido').after('<span class="error" style="color:red;">El apellido no puede estar vacío.</span>');
            $('#Apellido').css('border-color', 'red');
        } else if (!soloLetras.test(apellido)) {
            isValid = false;
            $('#Apellido').after('<span class="error" style="color:red;">El apellido solo debe contener letras.</span>');
            $('#Apellido').css('border-color', 'red');
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (correo && !emailRegex.test(correo)) {
            isValid = false;
            $('#Correo').after('<span class="error" style="color:red;">Formato de correo no válido.</span>');
            $('#Correo').css('border-color', 'red');
        } else if (!correo) {
            isValid = false;
            $('#Correo').after('<span class="error" style="color:red;">El correo electrónico es obligatorio.</span>');
            $('#Correo').css('border-color', 'red');
        }

        const passwordRegex = /^(?=.*\d{2,})(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

        if (password === '') {
            isValid = false;
            $('#password').after('<span class="error" style="color:red;">La contraseña es obligatoria.</span>');
            $('#password').css('border-color', 'red');
        } else if (!passwordRegex.test(password)) {
            isValid = false;
            $('#password').after('<span class="error" style="color:red;">La contraseña debe tener al menos 8 caracteres, 2 números, una mayúscula y un carácter especial.</span>');
            $('#password').css('border-color', 'red');
        }

        if (confirmPassword === '') {
            isValid = false;
            $('#ValidPassword').after('<span class="error" style="color:red;">La confirmación de la contraseña es obligatoria.</span>');
            $('#ValidPassword').css('border-color', 'red');
        } else if (password !== confirmPassword) {
            isValid = false;
            $('#ValidPassword').after('<span class="error" style="color:red;">Las contraseñas no coinciden.</span>');
            $('#ValidPassword').css('border-color', 'red');
        }

        if (isValid) {
            if ($('input[name="image"]:checked').length === 0) {
                isValid = false;
                alert("Debe seleccionar una imagen.");
            }
        }

        if (isValid) {
            let selectedImage = $('input[name="image"]:checked').next('label').find('img').attr('src');
            let username = $('#User').val();
            localStorage.setItem("user", username);
            localStorage.setItem("image", selectedImage);
            localStorage.setItem("pass", $('#password').val());
            alert("Registro exitoso!");
            $('#RegisterForm')[0].reset();
            $('#btn-register').prop('disabled', true); 
            $('#Edad, #User').val('');
            $(".error").remove(); 
            $('input').css('border-color', ''); 
            window.location.href = 'Login.html'; 
        }
    });

    $('#btn-limpiar').click(function () {
        $('#RegisterForm')[0].reset();
        $('#btn-register').prop('disabled', true); 
        $('#Edad, #User').val('');
        $(".error").remove(); 
        $('input').css('border-color', ''); 
    });
});
