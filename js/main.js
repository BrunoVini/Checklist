$(function(){

    var alternar = true;
    var number = 10;
    var arrayTarefasNovas = [];


    const reloadLocalNotas = async () => {
        if(localStorage.getItem('notas') == null) {
            localStorage.setItem('notas', []);
            localStorage.setItem('terminar', []);
            $('.lugar').html('<h3 id="addNota">Adicione Tarefas</h3>')
        }else if(localStorage.getItem('notas') != '') {
            $('.lugar').html("");
            $('.lugarDel').html("");
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

    reloadLocalNotas();
    
    function salvarStorage(novaTarefa){
        
        if(localStorage.getItem('notas') == []) {
            arrayTarefasNovas = novaTarefa;
            localStorage.setItem('notas', arrayTarefasNovas);
        } else {
            arrayTarefasNovas = localStorage.getItem('notas').split(',');
            arrayTarefasNovas.push(novaTarefa);
            localStorage.setItem('notas', arrayTarefasNovas);
        }

        if(localStorage.getItem('terminar') == []) {
            arrayTarefasNovas = ['A'];
            localStorage.setItem('terminar', arrayTarefasNovas);
        } else {
            arrayTarefasNovas = localStorage.getItem('terminar').split(',');
            arrayTarefasNovas.push('A');
            localStorage.setItem('terminar', arrayTarefasNovas);
        }

        reloadLocalNotas();
    }


    $('.titulo').dblclick(function(){
        $(this).html('');
        $('.mudartitulo').fadeIn(0);
        $('.alterar').html('<div class="changeTitle"><h4>Mudar Título</h4><span></span></div>')
        mudarCorAlterar('#13632d');
        number = 5;
    })

    $('.alterar').click(function(){
        if(number === 10){
        localStorage.setItem('notas', []);
        localStorage.setItem('terminar', []);
        $('.lugar').html('');
        $('.lugarDel').html('');
        }else{
            let title = $('input[name="mudarTitulo"]').val();

            if(title == ''){}else{
            $('.mudartitulo').fadeOut(0)
            $(this).html('<div><h4>Deletar Tudo</h4><span></span></div>');

            $('.titulo').text(title);
            localStorage.setItem('title', title);
            mudarCorAlterar('#fff');
            number = 10;
            }
        }
    })

    const mudarCorAlterar = (color) => {
        $('.alterar').css('border-color',color);
        $('.alterar').css('color', color);
    }


    $('input[name=adicionar]').click(function(){
        var nome = $('input[name="tarefa"]').val();
        if(nome == ''){
            return;
        }else{
            salvarStorage(nome);
        }

        $('input[name="tarefa"]').val('');
    })


    $('.criar').click(function(){
        if(alternar){
            $(this).html('<div class="icon-fechar"><i class="red fas fa-times"></i><span></span></div>')
            $(this).css('border','2px solid #f76b5e');
            $('label.nova').fadeIn();
        }else{
            $(this).html('<div class="box"><span></span><h4>Nova Tarefa</h4></div>')
            $(this).css('border','1px solid #fff');
            $('label.nova').fadeOut();
        }
        alternar = !alternar;
    })

    const elemento = (nome, indice) => {
        return `<label ondblclick="(mudarNomeNota(${indice}))"><input type="checkbox" name="nota" onclick="mudarLetra(${indice})" end="A"><i class="primary"></i><span>`+nome+`</span></label>`;
    }

    const delInput = index => 
        `<i class="fas fa-trash-alt delete" onclick="deletar(${index})"></i>`;

})