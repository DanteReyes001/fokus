const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const botonIniciarPausar = document.querySelector('#start-pause')
const audioBeep = new Audio('./sonidos/beep.mp3')
const audioPause = new Audio('./sonidos/pause.mp3')
const audioPlay = new Audio('./sonidos/play.wav')
const textoIniciarPausar = document.querySelector('#start-pause span')
const tiempoEnPantalla = document.querySelector('#timer')
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon")

let tiempoTranscurridoEnSegundos = 1500
let idIntervalo = null;

musica.loop = true
musica.volume = 0.2

inputEnfoqueMusica.addEventListener('change',()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});

botonCorto.addEventListener('click', () => { /*Utilizamos una función flecha para colocar el nuevo evento */
    // html.setAttribute('data-contexto','descanso-corto') /* Con setAttribute colocamos el evento que tenemos y a lo que queremos cambiar */
    // banner.setAttribute('src','./imagenes/descanso-corto.png')
    tiempoTranscurridoEnSegundos = 300
    cambiarContexto('descanso-corto') /* Mandamos a llamar la funcion de cambiarContexto() asignandole al parametro 'contexto' el valor de 'descanso-corto' */
    botonCorto.classList.add('active');  /* Se usa el metodo classList.add para agregar el estado de activo para cuando un boton sea presionado*/
})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')  /* Mandamos a llamar la funcion de cambiarContexto() asignandole al parametro 'contexto' el valor de 'enfoque' */
    botonEnfoque.classList.add('active'); /* Se usa el metodo classList.add para agregar el estado de activo para cuando un boton sea presionado*/
})

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900
    cambiarContexto('descanso-largo')  /* Mandamos a llamar la funcion de cambiarContexto() asignandole al parametro 'contexto' el valor de 'descanso-largo' */
    botonLargo.classList.add('active'); /* Se usa el metodo classList.add para agregar el estado de activo para cuando un boton sea presionado*/
})

function cambiarContexto(contexto){

    mostrarTiempo()
    botones.forEach(function(contexto){  /* Estamos creando una función para que cuando un botón sea presionado los demás permanezcan sin activarse*/
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`./imagenes/${contexto}.png`) /* Utilizamos template strings para mandar a llamar nuestro parametro de 'contexto' */

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal tomar un respiro? 
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
        break;
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie
            <strong class="app__title-strong">Haz una pausa larga.</strong>`
        default:
            break;
    }
}

const cuentaRegresiva = () =>{
    if(tiempoTranscurridoEnSegundos <= 0 ){
        audioBeep.play()
        reiniciar()
        alert('¡Tiempo finalizado, toma un descanso!')
        return
    }
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo()
}

botonIniciarPausar.addEventListener('click',iniciarPausar)

function iniciarPausar(){
    if(idIntervalo){
        audioPause.play();
        reiniciar();
        return
    }
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva,1000)
    textoIniciarPausar.textContent = "Pausar"
    iconoIniciarPausar.setAttribute('src','./imagenes/pause.png')

}

function reiniciar(){
    clearInterval(idIntervalo)
    textoIniciarPausar.textContent = "Comenzar"
    iconoIniciarPausar.setAttribute('src', `/imagenes/play_arrow.png`)
    idIntervalo = null
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000) 
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()