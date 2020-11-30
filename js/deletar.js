var arrLista = [];
var arrayTarefas = [];
var arrTarefasEnd = [];

async function deletar(indice) {
	var notasLista = await localStorage.getItem('notas').split(',')
    var tarefasFeitas = await localStorage.getItem('terminar').split(',')

	for (i = 0; i <= notasLista.length; i++) {
		if(i == indice) {
			continue;
		}
        arrLista.push(notasLista[i]);
        arrTarefasEnd.push(tarefasFeitas[i]);
    }
    
    arrLista.pop();
    arrTarefasEnd.pop();

	await localStorage.setItem('notas', arrLista);
    await localStorage.setItem('terminar', arrTarefasEnd);

    reloadNotas();
}

const reloadNotas = async () => {
    if(localStorage.getItem('notas') == null) {
        localStorage.setItem('notas', []);
        localStorage.setItem('terminar', []);
        $('.lugar').html('<h3 id="addNota">Adicione Tarefas</h3>');
    } else if (localStorage.getItem('notas') == '') {
        $('.lugar').html("");
        $('.lugarDel').html("");
        
    } else if(localStorage.getItem('notas') != '') {
        $('.lugar').html("");
        $('.lugarDel').html("");

        arrLista = [];
        arrayLista = [];
        arrTarefasEnd = [];

        var arrayTarefas = await localStorage.getItem('notas').split(',');
        for(i = 0; i < arrayTarefas.length; i++) {
            $('.lugar').append(elemento(arrayTarefas[i], i));
            $('.lugarDel').append(delInput(i));
            if(i == (arrayTarefas.length - 1)) {
                $('#marcar-notas').click();
            }
        }
    }
}


function elemento(nome, indice){
    return `<label ondblclick="(mudarNomeNota(${indice}))"><input type="checkbox" name="nota" onclick="mudarLetra(${indice})" end="A"><i class="primary"></i><span>`+nome+`</span></label>`;
}

const delInput = index => 
        `<i class="fas fa-trash-alt delete" onclick="deletar(${index})"></i>`;


$('body').click(() => {
    $('.dark').fadeOut();
})

$('.mudarNota').click(e => {
    e.stopPropagation(e);
})

const mudarNomeNota = async index => {
    let notas = await localStorage.getItem('notas').split(',');
    $('.dark [type="text"]').val(notas[index]);

    $('.dark [type="submit"]').attr('posicao', index);
    $('.dark').fadeIn();
}

$('.dark form').submit(async (event) => {
    event.preventDefault();
    let notas = await localStorage.getItem('notas').split(',');
    let notasNovas = [];
    let indice = $('.dark [type="submit"]').attr('posicao');
    var nomeNotaNova = $('.dark [type="text"]').val();

    await notas.forEach((valor, index) => {
        if(index == indice) {
            notasNovas.push(nomeNotaNova);
        } else {
            notasNovas.push(valor);
        }
    })

    await localStorage.setItem('notas', notasNovas);
    $('.dark').fadeOut();
    reloadNotas();
})