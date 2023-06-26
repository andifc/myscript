/*

Shortlink.js
v1.0
*/



const firebaseConfig = {
    apiKey: "AIzaSyC8mYBsrNbD7qvW-0ArQEuJzrrGsWLSEn4",
    authDomain: "shortlink-28caf.firebaseapp.com",
    projectId: "shortlink-28caf",
    storageBucket: "shortlink-28caf.appspot.com",
    messagingSenderId: "1074336422107",
    appId: "1:1074336422107:web:ff4122a3cbc113e8b514fe"
  };



const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var msg = Get(".msg");
var content = Get(".content");
var input = Get(".int");
var btn = Get(".ch");
var form = Get(".s");
var shorts = Get(".short");
var url = window.location.href;
var local = localStorage;
var debounce = true;
var livelinks = Get(".liv");
const regex = /^[a-zA-Z0-9]+$/;

window.onload = function() {
  var a = 15;
  if(obtenerUltimoSegmentoURL(url) !== '' && regex.test(obtenerUltimoSegmentoURL(url))) {
   var Redir = obtenerURL(obtenerUltimoSegmentoURL(url));
    content.innerHTML = `<a class = "button ch">Esperando...</a>` ;
    shorts.remove();
    while (a >= 0) {
      msg.innerHTML = `<span>Por favor espera: <span class = "count">${a}</span> Segundos</span>`;
      a--;
      wait(1000); // Establece la velocidad en milisegundos (en este caso, 1 segundo)
    }
    btn.setAttribute("href", `${Redir}`);
  }
}


form.onsubmit = function (ev) {
  ev.preventDefault();
  if(debounce && input.value.length !== 0){
    var link = input.value;
    var gencode = generateShortCode();
    const codigo = gencode;
    guardarURL(link, codigo);
    set(`${url}/${codigo}`);
    get_live_links();
    setTimeout(() =>{debounce = false;},1000)
  } else {
    debounce = true;
    input.value = "";
  }
}

  // Función para obtener la URL asociada a un código en Firestore
async function obtenerURL(codigo) {
    try {
      const collectionRef = db.collection('Enlaces'); // Cambia 'enlaces' por el nombre de tu colección en Firestore
  
      // Realiza una consulta para obtener el documento correspondiente al código
      const docSnapshot = await collectionRef.doc(codigo).get();
  
      if (docSnapshot.exists) {
        // El documento existe, devuelve la URL asociada
        const url = docSnapshot.data().url;

        return url;
      } else {
        // El documento no existe, devuelve null o un valor indicativo de que no se encontró la URL
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la URL:', error);
      return null;
    }
  }
  

  
  // Función para guardar la URL en Firestore
  async function guardarURL(url, code) {
    try {
      const collectionRef = db.collection('Enlaces'); // Cambia 'enlaces' por el nombre de tu colección en Firestore
  
      // Verifica si la URL ya existe en Firestore
      const querySnapshot = await collectionRef.where('url', '==', url).get();
  
      if (!querySnapshot.empty) {
        // La URL ya existe, recorre todos los documentos y obtén los códigos asociados
        for (let i = 0; i < querySnapshot.docs.length; i++) {
          const documento = querySnapshot.docs[i];
          const codigo = documento.id;
          

        }
      } else {
        // La URL no existe, genera un nuevo código y guárdalo junto con la URL
        const codigo = code;
  
        await collectionRef.doc(codigo).set({ url });
  
      }
    } catch (error) {
      console.error('Error al guardar la URL:', error);
    }
  }
  

  

function generateShortCode() {
  var o = true
  var link = input.value
  local.setItem("curul", input.value);

  if(o) {
     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    o = false;
    if(local.getItem("curul")!== null && local.getItem("curul") !== link) {
      setTimeout(() =>{o = true;},1000)
    }
    
    return code;
  } else {return;}
   
  }
  
  function obtenerUltimoSegmentoURL(url) {
    // Eliminar el fragmento de la URL
    var urlSinFragmento = url.split('#')[0];
    
    // Eliminar el parámetro "?m=1" de la URL
    var urlSinParametro = urlSinFragmento.split('?')[0];
    
    // Obtener el último segmento de la URL sin el fragmento ni el parámetro
    var segmentos = urlSinParametro.split('/');
    return segmentos[segmentos.length - 1];
  }
  

function set(url) {

      var template = `<div class="shorti">
      <input onclick="this.select()" readonly id="link" value=${url}><label onclick="copyFunction()" for="link">Copiar</label>
      </div>
      `;
    shorts.innerHTML = `${template}`;

  } 


  function wait(ms) {
    const start = Date.now();
    let currentTime = start;
    while (currentTime - start < ms) {
      currentTime = Date.now();
    }
  }


  async function get_live_links() {
   try {
    const collectionRef = db.collection('Enlaces');
    const querySnapshot = await collectionRef.get() || 0;
    var linksHorts = querySnapshot.size;
    livelinks.innerHTML = linksHorts;
  } catch (error) {
    console.error('Error al obtener el número de documentos:', error);
  }
}

get_live_links()
