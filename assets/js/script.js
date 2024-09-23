//INITIAL DATA
let currentQuestion = 0;
let correctAnswers = 0;
showQuestion();

//EVENTS
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//FUNCTIONS
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];
//calculando a porcetagem da barra verde de progresso, é baseada nas opções de cada pergunta, não nas 10 questões em si
        let pct = Math.floor((currentQuestion / questions.length) * 100);
//Transformando a largura da barra em porcentagem        
        document.querySelector('.progress--bar').style.width = `${pct}%`;
        
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

//quanto menos usar o DOM melhor devido a memória do usuário, e quando usar tente ser uma única vez  
//Criamos um atributo DATA para armazenar o valor de i para cada uma das opções, demos uma class OPTION que já existia no CSS e n no HTML anterior, dpois convertendo i de string para inteiro(apenas nessa parte do código) e somando +1 para ficar de 1 a 4, assim como pegando o valor de options a cada iteração.

//Em JavaScript, as chaves (i) de um objeto ou array iterado usando for...in são retornadas como strings, mesmo que pareçam números. Portanto, ao utilizar i diretamente dentro do loop for...in, i é tratado como uma string e não como um número.

//o i é utilizado em dois contextos diferentes, e é por isso que o parseInt só é necessário em uma das utilizações:
//data-op="${i}": Aqui, i é usado diretamente como o valor do atributo data-op. Não há necessidade de conversão, pois o atributo data-op armazena um texto, e i já é uma string. A conversão não é necessária porque esse valor é apenas um identificador que será usado depois no código para outras lógicas.
//${parseInt(i) + 1}: Aqui, i precisa ser convertido para um número porque você quer realizar uma operação aritmética (+ 1). Se i fosse usado diretamente sem parseInt, o operador + concatenaria a string 'i' com '1', resultando em '01', '11', etc., ao invés de fazer uma soma matemática.
//${q.options[i]}: Aqui, i é usado para acessar um valor dentro do array ou objeto q.options. Como i é uma string, ele é automaticamente tratado como um índice de array válido (pois internamente, o acesso array['0'] funciona da mesma forma que array[0]).  
        let optionsHtml = '';
        for(let i in q.options) {

            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {//passando para inteiro pois ANSWER é int em Questions.JS
    let clikedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clikedOption) {
        correctAnswers++;
    }

    //Errando ou acertando,atualiza indo para a próxima questão
    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Putz...';
        document.querySelector('.scorePct').style.color = '#ff0000';
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Está no caminho!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bem, parabéns!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Voce respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}