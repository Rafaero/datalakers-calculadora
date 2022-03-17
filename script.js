function goBack(){
    window.history.back();
}
async function enviar() {
    let id = document.getElementById("idField").value;
    let questionOne = "";
    let questionTwo = "";
    let questionThree = "";
    let questionFour = "";
    let questionFive = "";
    let questionSix = "";
    let questionSeven = "";
    let questionEight = "";
    let questionNine = "";
    let questionTen = "";
    let questionEleven = "";
    let questionTwelve = "";


    let data = [];

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDEzMjIzNzEsImVtYWlsIjoibHV6LmlyaWFydGVAa2V5cnVzLmNvbSIsImFwcGxpY2F0aW9uIjozMDAxMjYwMDl9fQ.vdpen9-ki7OI5k8uTwgnged5Quq8R1woBLjii6Bd0cVVV7lwFg4ZBw2_3kH_7u2zR7bXZ95a_omGsQA9AYR8BQ',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `query{
            card(id: "${id}"){
                 fields{
                name
                value
                }
              }
            }`})
    };

    await fetch('https://api.pipefy.com/graphql', options)
        .then(response => (response.json()))
        .then(response => data = (response.data.card.fields))
        .catch(err => console.error(err));


    data.map((value) => {
        if (value.name == "GAP SISTEMICO") {
            questionOne = parseFloat(value.value);
        }
    })
    data.map((value) => {
        if (value.name == "REGULAMENTAÇÃO / LGPD / ANATEL") {
            questionTwo = parseFloat(value.value);
        }
    })
    data.map((value) => {
        if (value.name == "OBRIGAÇÃO LEGAL") {
            questionThree = parseFloat(value.value);
        }
    })
    data.map((value) => {
        if (value.name == "IMPACTA A JORNADA DO USUÁRIO FINAL / NPS") {
            questionFour = parseFloat(value.value);
        }
    })
    data.map((value) => {
        if (value.name == "BENEFÍCIO PARA O NEGÓCIO") {
            questionFive = parseFloat(value.value);
        }
    })
    data.map((value) => {
        if (value.name == "VALOR DO RISCO OPERACIONAL") {
            questionSix = parseFloat(value.value);
        }
    })
    data.map((value) => {
        if (value.name == "MATURIDADE DO DADO") {
            questionSeven = parseFloat(value.value);
        }
    })
    data.map((value) => {
        if (value.name == "PLANEJADO E PREVISTO EM BUDGET") {
            questionEight = parseFloat(value.value);
        }
    })
    data.map((value) => {
        if (value.name == "AUDITORIA / KPIs / MONITORIA DO PROCESSO") {
            questionNine = parseFloat(value.value);
        }
    })
    data.map((value) => {
        if (value.name == "IMPLEMENTAÇÃO DE BOAS PRÁTICAS / PAPÉIS E RESPONSABILIDADES") {
            questionTen = parseFloat(value.value);
        }
    })
    data.map((value) => {
        if (value.name == "IMPACTO EM ANALYTICS/DIGITAL/CSO") {
            questionEleven = parseFloat(value.value);
        }
    })

    data.map((value) => {
        if (value.name == "2.2 Score de Prioridade") {
            questionTwelve = parseFloat(value.value);
        }
    })

    let result = (questionOne + questionTwo + questionThree + questionFour + questionFive + questionSix + questionSeven + questionEight + questionNine + questionTen + questionEleven + questionTwelve)

    if (typeof(result) === 'number' &&  isNaN(result) != true) {

        document.getElementById("show-sum").innerHTML = result;

        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDEzMjIzNzEsImVtYWlsIjoibHV6LmlyaWFydGVAa2V5cnVzLmNvbSIsImFwcGxpY2F0aW9uIjozMDAxMjYwMDl9fQ.vdpen9-ki7OI5k8uTwgnged5Quq8R1woBLjii6Bd0cVVV7lwFg4ZBw2_3kH_7u2zR7bXZ95a_omGsQA9AYR8BQ',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: `mutation{
                updateCardField(input: {
                    card_id: "${id}"
                    field_id: "resultado"
                    new_value: "${result}"
                }){clientMutationId}}`})

        };
    
        fetch('https://api.pipefy.com/graphql', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));


    } else {
        alert("Verifique se todos os campos manuais e automáticos estão preenchidos na fase TRIAGEM");
    }

}
