//variables
let botonAnyadir=document.getElementById("botonAnyadir")
let panel=document.getElementById("panel")
let nombre=document.getElementById("nombre")
let solucion=document.getElementById("solucion")
let botonResuelve=document.getElementById("botonResuelve")

let amigos=[]
let solucionClientes = new Map()



// //funciones
// function render(){
//     console.log("AMIGOS: "+amigos)
//     //console.log("CLIENTES: "+clientes)
//     panel.innerHTML=""
//     amigos.forEach((amigo)=>{
//         console.log(amigo)
//         panel.innerHTML+=`<input type='button' value='Borrar' data-id='${amigo}'>`+amigo+"<BR>"
//     })
// }

//funciones
function render(){
    console.log("AMIGOS: "+amigos)
    const elementos = document.createElement('ul')
    panel.innerHTML=""
    amigos.forEach((amigo)=>{
        console.log(amigo)
        let amigoLi = document.createElement('li')
        let button = document.createElement('input')
        let textoLi = document.createElement('span')
        button.type='button'
        button.dataset.id=amigo
        button.value='Borrar'
        textoLi.innerHTML=amigo
        amigoLi.append(button)
        amigoLi.append(textoLi)
        elementos.append(amigoLi)
    })
    panel.append(elementos)
}

//funciones
function renderSolucion(){
    console.log("AMIGOS: "+amigos)
    solucion.innerHTML=""
    //console.log("CLIENTES: "+clientes)
    solucionClientes.forEach((value, key) => {
        solucion.innerHTML+=  `${value} --> ${key}`+"<br>"
    })
}

function borraAmigo(nombre){
    let indice=amigos.indexOf(nombre)
    amigos.splice(indice,1)
    render()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/*
    devuelve false si alguno se asigna a sí mismo
*/
function reparto(){
    let quien = amigos.slice() // copia
    solucionClientes = new Map()
    let esCorrecto = true

    for (let i = quien.length - 1; i > 0; i--) {
        let j = aleatorio(0, i)
        ;[quien[i], quien[j]] = [quien[j], quien[i]]
    }

    for (let i = 0; i < amigos.length; i++) {
        let regalador = amigos[i]
        let regalado  = quien[i]

        if (regalador === regalado) {
            esCorrecto = false
            break
        }

        solucionClientes.set(regalador, regalado)
    }

    // si no es correcto, vaciamos el mapa para no mostrar basura
    if (!esCorrecto) {
        solucionClientes.clear()
    }

    return esCorrecto
}

//eventos
botonAnyadir.addEventListener("click",(e) => {
    //capturar el formulario
    e.preventDefault()
    amigos.push(nombre.value)
    render()
})


panel.addEventListener("click", (e)=>{
    let nombre=e.target.dataset.id
    console.log("Quieres borrar: "+ nombre)
    borraAmigo(nombre)
})

botonResuelve.addEventListener("click", (e)=>{
    console.log("Voy a resolver ")
    let correcto=reparto()
    while (!correcto){
        if (!correcto)
            console.log("El mapa no acabo correctamente.")
        correcto=reparto()
    }
    
    // c --> c
    renderSolucion()
})
