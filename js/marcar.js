arrValuesNotas = [];

function marcarNota() {
    
    if(localStorage.getItem('terminar') == []) {
        return;
    } else {
       var values = localStorage.getItem('terminar').split(',');
       values.forEach((valorAtual, index) => {
           if(valorAtual == 'F') {
            $('label [type="checkbox"]').eq(index).click();
           }
       })
    }
}


var novaListaValor  = [];

function mudarLetra(index) {

    function frase(valor) {
        return $('label [type="checkbox"]').eq(index).attr('end', valor);
    }

    var value =  $('label [type="checkbox"]').eq(index).attr('end');
    if(value == 'A') {
        frase('F')
        mudarValorNoArray(index, 'F');
    } else {
        frase('A')
        mudarValorNoArray(index, 'A');
    }
}

async function mudarValorNoArray(indexAtual, valorAtual) {
    var data = localStorage.getItem('terminar').split(',');
    novaListaValor = [];
    await data.forEach((valor, index) => {
        if(index == indexAtual) {
            novaListaValor.push(valorAtual);
        } else {
            novaListaValor.push(data[index]);
        }
    })

    localStorage.setItem('terminar', novaListaValor);
}


const changeTitle = () => {
    var title = localStorage.getItem('title');

    if(title != null) {
        $('.titulo').text(title);
    }
}

changeTitle();