window.addEventListener('load', function(){

    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');
    // recuperar nombre de usuario
    const btnlogout = this.document.getElementById('btnlogout');
    const result = JSON.parse(this.localStorage.getItem('result'));

    
    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

    btnlogout.addEventListener('click', cerrarsesion);
});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

async function cerrarsesion() {

    const url = 'http://localhost:8082/login/logout-async';
    const request = {
        tipoDocumento: localStorage.getItem('tipoDocumento'),
        numeroDocumento: localStorage.getItem('numeroDocumento')
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.resultado) {
            localStorage.clear();
            window.location.replace('login.html');
        } else {
            console.log( "Error: " + result.mensajeError);
        }

    } catch (error) {
        console.log('Error al cerrar sesión', error);
    }
}
