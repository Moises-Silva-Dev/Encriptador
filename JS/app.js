// rutas de las clases en css
const rutaBotonEncriptar = ".button__encriptar";
const rutaBotonDesencriptar = ".button__desencriptar";
const rutaBotonCopiar = ".button__copiar";
const rutaWarningUno = ".division__elementos__encriptados>p";
const rutaWarningDos = ".division__titulo__parrafo__desencriptar>h1";
const rutaImagenWarning = ".img__warning";
const rutaSeccionUnoDesencriptar = ".division__elementos__desencriptar";
const rutaSeccionDosDesencriptar = ".division__textarea__boton__desencriptar";
const rutaTextareaEncriptar = ".textarea__encriptar";
const rutaTextareaDesencriptar = ".textarea__desencriptar";

// optener elementos
const warningUno = selectorElementoHtml(rutaWarningUno);
const warningDos = selectorElementoHtml(rutaWarningDos);
const imagenWarning = selectorElementoHtml(rutaImagenWarning);
const textareaEncriptar = selectorElementoHtml(rutaTextareaEncriptar);
const textareaDesencriptar = selectorElementoHtml(rutaTextareaDesencriptar);
const seccionUnoDesencriptar = selectorElementoHtml(rutaSeccionUnoDesencriptar);
const seccionDosDesencriptar = selectorElementoHtml(rutaSeccionDosDesencriptar);
const botonCopiar = selectorElementoHtml(rutaBotonCopiar);


function selectorElementoHtml (elemento) {
    return document.querySelector(elemento);
}

function mostrarWarning (elemento) {

    const etiqueta = selectorElementoHtml(elemento);
    etiqueta.style.color = "red";

    if (elemento === rutaWarningDos) {
        etiqueta.style.display = "flex";
    } else {
        imagenWarning.style.filter = 'invert(26%) sepia(90%) saturate(7481%) hue-rotate(-7deg)';
    } 
}

function validarTexto() {
    
    const patron = /^[a-zñ\s]+$/;
    const capturarTexto = textareaEncriptar.value;

    if (patron.test(capturarTexto)) {
        return capturarTexto;
    } else if (capturarTexto === "") {
        mostrarWarning(rutaWarningDos);
    } else {
        mostrarWarning(rutaWarningUno);
    }
        
}

function encriptarTexto () {
    
    let textoValidado = validarTexto();
    let textoEncriptado = "";
    const reglaEncriptado = {
        'a' : 'ai',
        'e' : 'enter',
        'i' : 'imes',
        'o' : 'ober',
        'u' : 'ufat'
    };

    if (textoValidado !== undefined) {
        for (let letra of textoValidado) {
            textoEncriptado += reglaEncriptado[letra] || letra;
        }
        mostrarTextoEncriptado(textoEncriptado);
        return textoEncriptado;
    } 

    return; // punto de quiebre para el valor undefined

}

function verificarTextoEncriptado () {
    const reglasCifrado = ["ai", "enter", "imes", "ober", "ufat"]
    for (const patron of reglasCifrado) {
        if (textareaEncriptar.value.includes(patron)) {
            return true;
        }
    }
    return false;
}

function mostrarTextoEncriptado (texto) {
    textareaDesencriptar.value = texto;
    seccionUnoDesencriptar.style.display = "none";
    seccionDosDesencriptar.style.display = "flex";
}

function copiarTextoEncriptado () {
    let origenTexto = textareaDesencriptar.value;
    let elementoBotonCopiar = botonCopiar;
    let copiarTextoEncriptado = navigator.clipboard.writeText(origenTexto);
    
    copiarTextoEncriptado.then(() => {
        elementoBotonCopiar.textContent = "Texto Copiado!";
        elementoBotonCopiar.style.color = "red";
        elementoBotonCopiar.style.borderColor = "red";
        textareaEncriptar.value = "";
        setTimeout(() => {
            elementoBotonCopiar.textContent = "Copiar";
            elementoBotonCopiar.style.color = "var(--color-cuaternario)";
            elementoBotonCopiar.style.borderColor = "var(--color-terciario)";
        }, 2500);
    }).catch(err => {
        console.error("Error al copiar desde el portapapeles: ", err);
    })
}

function desencriptarTexto () {
    
    let textoValido = validarTexto();
    let textoEncriptado = textareaEncriptar.value;
    let textoDesencriptado = textoEncriptado;
    const reglaDesencriptado = [
        {encriptado: 'ai', desencriptado: 'a'},
        {encriptado: 'enter', desencriptado: 'e'},
        {encriptado: 'imes', desencriptado: 'i'},
        {encriptado: 'ober', desencriptado: 'o'},
        {encriptado: 'ufat', desencritptado: 'u'}
    ];

    if (textoEncriptado.length > 0 && textoValido !== undefined) {

        if (verificarTextoEncriptado() || textareaEncriptar.value === textareaDesencriptar.value) {
            for (let regla of reglaDesencriptado) {
                textoDesencriptado = textoDesencriptado.split(regla.encriptado).join(regla.desencriptado);
            }
            textareaEncriptar.style.color = "red";
            setTimeout(() => {
                textareaEncriptar.style.color = "var(--color-terciario)";
            }, 2500);
            textareaEncriptar.value = textoDesencriptado;
        } else {
            warningDos.textContent = "El texto ingresado no esta encriptado";
            warningDos.style.color= "red";
            warningDos.style.display = "flex";
            seccionDosDesencriptar.style.display = "none";
            seccionUnoDesencriptar.style.display = "flex";
        }
    } 

    return;
}

function limpiar () {
    warningUno.style.color = "var(--color-cuaternario)";
    imagenWarning.style.filter = "none"; 
    warningDos.style.color = "var(--color-cuaternario)";
    warningDos.style.display = "none";
    warningDos.textContent = "Ningún mensaje fue encontrado"
    seccionUnoDesencriptar.style.display = "flex";
    seccionDosDesencriptar.style.display = "none";
}

selectorElementoHtml(rutaBotonEncriptar).addEventListener ('click', () => {
    if (textareaEncriptar.value === "") {
        if (seccionDosDesencriptar.style.display) {
            seccionDosDesencriptar.style.display = "none";
            seccionUnoDesencriptar.style.display = "flex";
        }
        mostrarWarning(rutaWarningDos);
    }
}); 

selectorElementoHtml(rutaBotonDesencriptar).addEventListener ('click', () => {
    if (textareaEncriptar.value === "") {
        if (seccionDosDesencriptar.style.display) {
            seccionDosDesencriptar.style.display = "none";
            seccionUnoDesencriptar.style.display = "flex";
        }
        mostrarWarning(rutaWarningDos);
    }
}); 

selectorElementoHtml(rutaTextareaEncriptar).addEventListener ('input', () => {
    if (warningUno.style.color == "red" || warningDos.style.color == "red") {
        limpiar();
    }
});