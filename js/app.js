function seguro(marca,year,tipo){
    this.marca = marca,
    this.year = year,
    this.tipo = tipo
};
//realizo la cotizacion
seguro.prototype.cotizarSeguro = function(){
    let cantidad;
    const base = 2000;
    switch(this.marca){
        case '1':
            cantidad = base * 1.05;
            break;
        case '2':
            cantidad = base * 1.15;
            break;
        case '3':
            cantidad = base * 1.25;
            break;
        default:
            break;
    }
    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia*3)*cantidad)/100;
    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.5;
    }
    return cantidad;
}

function UI(){}

UI.prototype.crearOptions = ()=>{
    const max = new Date().getFullYear();
    const min = max - 10;

    const selector = document.querySelector('#year');//selecciono la etiqueta donde irán los años
    for(let i= max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selector.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = function(mensaje,tipo){
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }

    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (total,seguro)=>{
    const div = document.createElement('div');
    const {marca,tipo,year} = seguro;
    let texto;
    switch(marca){
        case '1':
            texto = 'Ford';
            break;
        case '2':
            texto = 'Toyota';
            break;
        case '3':
            texto = 'Peugeot';
            break;
        default:
            break;
    }

    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Resumen</p>
        <p class="font-bold">marca:  ${texto}</p>
        <p class="font-bold">año:  ${year}</p>
        <p class="font-bold">tipo:  ${tipo}</p>
        <p class="font-bold">Total: $ ${total}</p>
    `;
    const resultado = document.querySelector('#resultado');
    //mostrar sounner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';//se borra el spinner
        resultado.appendChild(div);//se muestra el resultado
    }, 3000);
}

const ui = new UI();

document.addEventListener('DOMContentLoaded',()=>{
    ui.crearOptions();
})

EventsListeners();
function EventsListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit',cotizar);
}

function cotizar(e){
    e.preventDefault();
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje("todos los campos son requeridos","error");
        return;
    }
    ui.mostrarMensaje('cotizando...','exito');

    const result = document.querySelector('#resultado div');
    if(result != null){
        result.remove();
    }

    const seguro1 = new seguro(marca,year,tipo);
    const total = seguro1.cotizarSeguro();

    ui.mostrarResultado(total,seguro1);
}