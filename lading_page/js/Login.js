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
    const usuario = localStorage.getItem("user");

    const imagen = localStorage.getItem("image");

    const loginExitos = localStorage.getItem('LoginExitos');
    if (loginExitos === 'True') {
        $('#Usuario').show();
    } else {
        $('#Usuario').hide();
    }

    if (usuario) {
        $('#user').val(usuario);
    }

    if (imagen) {
        $('#userImage').attr('src', imagen); 
    }

    if (usuario) {
        $('#userUsuario').val(usuario);
    }

    localStorage.setItem('LoginExitos', 'False'); 

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

    localStorage.setItem('LoginExitoso', 'False'); 
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        const usuarioInput = $('#user').val();
        const passwordInput = $('#floatingPassword').val();
    
        if (usuarioInput && passwordInput) {
            localStorage.setItem("user1", usuarioInput);
            window.location.href = "Licencias.html"; 
            localStorage.setItem('LoginExitoso', 'true'); 
        } else {
            alert('Por favor, completa los campos correctamente.');
        }
    });
});

const toggleModoOscuro = document.getElementById('modo-oscuro');
if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('modo-oscuro');
    toggleModoOscuro.checked = true;
}

toggleModoOscuro.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('modo-oscuro');
        localStorage.setItem('modoOscuro', 'true'); 
    } else {
        document.body.classList.remove('modo-oscuro');
        localStorage.setItem('modoOscuro', 'false'); 
    }
});
