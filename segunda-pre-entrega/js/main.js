// Variables
let longitudContrasena = document.getElementById('longitud-contrasena');
let tipoContrasena = document.getElementById('tipo-contrasena');
let botonGenerarContrasena = document.getElementById('generar-contrasena');
let inputContrasenaGenerada = document.getElementById('contrasena-generada');
let botonCopiarContrasena = document.getElementById('copiar-contrasena');

// Función para generar contraseña
function generarContrasena(longitud, tipo) {
    let contrasena = '';
    let caracteres = '';

    switch (tipo) {
        case 'alfanumerica':
            caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            break;
        case 'numerica':
            caracteres = '0123456789';
            break;
        case 'alfabetica':
            caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            break;
        default:
            caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }

    for (let i = 0; i < longitud; i++) {
        contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return contrasena;
}

// Evento para generar contraseña
botonGenerarContrasena.addEventListener('click', () => {
    let contrasena = generarContrasena(parseInt(longitudContrasena.value), tipoContrasena.value);
    inputContrasenaGenerada.value = contrasena;
});

// Evento para copiar contraseña
botonCopiarContrasena.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(inputContrasenaGenerada.value);
        alert('Contraseña copiada al portapapeles');
    } catch (err) {
        alert('Error al copiar la contraseña');
    }
});
