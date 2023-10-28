/*
Hecho por un Random

V1

*/

const btn = Get(".btnsend");
const int = Get(".int");
const rp = Get(".respuestas");
const ld = Get(".loading");
const pcont = Get(".contp");

btn.addEventListener('click', function() {
    var inputUrl = int.value;
    if (isValidUrl(inputUrl)) {
        //http://localhost:3000/kahoot/get?id=
        ld.classList.remove("d-none");
        pcont.classList.add("d-none");
        rp.classList.add("d-none");
        fetchKahootData(`http://localhost:3000/kahoot/get?id=${extraerIDKahoot(inputUrl)}`)
        .catch((err) => {
            toast("Ha ocurrido un error. Regresa mas tarde.");
        })
        .finally(() =>{
            int.value = '';
            formatTXT();
            ld.classList.add("d-none");
            rp.classList.remove("d-none");
        });
    } else {
        toast("Porfavor ingresa una url valida.");
    }
});

const toast = msg => {
    const $toast = document.querySelectorAll(".toast")[0]
    const $toastbody = $toast.getElementsByClassName("toast-body")[0]
    const bootToast = new bootstrap.Toast($toast)
    if($toastbody) {
        $toastbody.innerText = msg
        bootToast.show()
    }
}
function isValidUrl(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  
   
    return pattern.test(url) && url.includes('kahoot.it');
  }

function extraerIDKahoot(url) {
    const regex = /(?:challenge-id=|challenge\/)([a-fA-F0-9-]+_[0-9]+)/;
    const match = url.match(regex);
  
    if (match && match.length > 1) {
      return match[1]; // El ID completo estará en la posición 1 del array de coincidencias
    } else {
      return "ID no encontrado";
    }
  }

async function fetchKahootData(api) {
    try {
      const response = await fetch(api);

      if (response.ok) {

        const data = await response.json();
  
        const preguntasYRespuestasCorrectas = await getCorrect(data);
        const respuestasContainer = rp
    
        preguntasYRespuestasCorrectas.forEach((pregunta, index) => {
          const newDiv = document.createElement('div');
          newDiv.classList.add('res', 'm-1', 'd-flex', 'bg-success', 'bg-opacity-25', 'p-3', 'rounded', 'align-items-center');
    
          const icon = document.createElement('i');
          icon.classList.add('fas', 'fa-star', 'fa-spin', 'text-success', 'fa-2x');
          newDiv.appendChild(icon);
    
          const innerDiv = document.createElement('div');
          innerDiv.classList.add('sd', 'text-truncate', 'd-flex', 'flex-column');
    
          const strongElement = document.createElement('strong');
          strongElement.classList.add('mx-3', 'text-truncate');
          strongElement.textContent = `Pregunta ${index + 1}: ${pregunta.q.pregunta}`;
          innerDiv.appendChild(strongElement);
    
          const spanElement = document.createElement('span');
          spanElement.classList.add('mx-4', 'text-truncate', 'hby', 'text-success');
          spanElement.textContent = `Respuesta Correcta: ${pregunta.q.respuestaCorrecta.join(', ')}`;
          innerDiv.appendChild(spanElement);
    
          newDiv.appendChild(innerDiv);
          respuestasContainer.appendChild(newDiv);
    
          const separator = document.createElement('hr');
          respuestasContainer.appendChild(separator);
        });

      } else {
        throw new Error('La solicitud no tuvo éxito. Código de estado: ' + response.status);
      }

     
    } catch (error) {
      console.error("Error al cargar los datos de Kahoot:", error);
    }
  }
  
  
  async function getCorrect(data) {
    const preguntasYRespuestasCorrectas = [];
    const preguntas = data.res.questions;
  
    for (const pregunta of preguntas) {
      const preguntaTexto = pregunta.question;
      const respuestaCorrecta = pregunta.answers.filter((respuesta) => respuesta.correct).map((respuesta) => respuesta.answer);
  
      preguntasYRespuestasCorrectas.push({
        q: {
        pregunta: preguntaTexto,
        respuestaCorrecta: respuestaCorrecta
        }
      });
    }
  
    return preguntasYRespuestasCorrectas;
  }
  
 
  function spansLatex() {
    const spans = document.getElementsByTagName('span');
    for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        let content = span.textContent;

        const latexContent = content.match(/<latex>(.*?)<\/latex>/);
        if (latexContent) {
            const latex = latexContent[1];
            const renderedLatex = katex.renderToString(latex, {
                throwOnError: false
            });

            content = content.replace(/<latex>(.*?)<\/latex>/, renderedLatex);
            span.innerHTML = content; // Restablecemos el contenido con la fórmula renderizada

            console.log(true); // Registro de procesamiento
        }
    }
}


function strongLatex() {
    const strong = document.getElementsByTagName('strong');
    for (let i = 0; i < strong.length; i++) {
        const element = strong[i];
        let content = element.textContent;
    

        const latexContent = content.match(/<latex>(.*?)<\/latex>/);
        if (latexContent) {
            const latex = latexContent[1];
            const renderedLatex = katex.renderToString(latex, {
                throwOnError: false
            });

            content = content.replace(/<latex>(.*?)<\/latex>/, renderedLatex);

            console.log(true); // Este console.log se mantiene para registrar el procesamiento
        }

        content = content.replace(/<b>/g, '');
        content = content.replace(/<\/b>/g, '');
        element.innerHTML = content; 
    }
}




function formatTXT() {
    strongLatex()
    spansLatex()
}

