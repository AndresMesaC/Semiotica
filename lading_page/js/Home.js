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

    const loginExitos = localStorage.getItem('LoginExitos');
    const usuario = localStorage.getItem("user");
    alert(loginExitos +' '+  usuario);
    if (usuario) {
        $('#userUsuario').text(usuario); 
    }
    if (loginExitos === 'True') {
        $('#Usuario').show();
    } else {
        $('#Usuario').hide();
    }

});


