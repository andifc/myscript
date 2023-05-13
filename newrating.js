const firebaseConfig = {
      
      databaseURL: decompress(fire)
    
      };
      
      firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const dbRef = db.ref();
const userID = generateUserID();
var iter = 0;
const stars = document.querySelectorAll(".stars-svg");
const strs = document.querySelector(".stars");
const pr = document.getElementById("pro");
const vts = document.getElementById("votes");
const sepc = document.querySelector(".spc");
const ld = document.querySelector(".loading");
var circleDiv = document.querySelector(".circle");

//stars ffinial style
if(localStorage.getItem("user") == null){
    localStorage.setItem("user",userID);
    GetData();
} else {
    GetData();
}

var ew = localStorage.getItem("user", userID);

(async function () {
  var rating = await GTuserDT();
  if (rating && ew) {
    var maxRating = 0;
    if (rating.rating1) {
      maxRating = 1;
    } else if (rating.rating2) {
      maxRating = 2;
    } else if (rating.rating3) {
      maxRating = 3;
    } else if (rating.rating4) {
      maxRating = 4;
    } else if (rating.rating5) {
      maxRating = 5;
    }

    for (var j = 0; j < maxRating; j++) {
      stars[j].classList.add("active");
      strs.classList.add("pointer");
    }
  } else {
    for (let i = 0; i < stars.length; i++) {
      stars[i].addEventListener("click", function () {
        Hit(i);
        for (let j = 0; j <= i; j++) {
          stars[j].classList.add("active");
          strs.classList.add("pointer");
        }
      });
    }
  }
})();




async function GetData() {
  try {
    const [Rating1, Rating2, Rating3, Rating4, Rating5] = await Promise.all([
      dbRef.child(`${blogTitle}_${blogID}/${postID}rating1`).once('value'),
      dbRef.child(`${blogTitle}_${blogID}/${postID}rating2`).once('value'),
      dbRef.child(`${blogTitle}_${blogID}/${postID}rating3`).once('value'),
      dbRef.child(`${blogTitle}_${blogID}/${postID}rating4`).once('value'),
      dbRef.child(`${blogTitle}_${blogID}/${postID}rating5`).once('value')
    ]);

    const rt1 = Rating1.val() || 0;
    const rt2 = Rating2.val() || 0;
    const rt3 = Rating3.val() || 0;
    const rt4 = Rating4.val() || 0;
    const rt5 = Rating5.val() || 0;

    const votos = rt1 + rt2 + rt3 + rt4 + rt5;
    const promedio = (rt1 * 1 + rt2 * 2 + rt3 * 3 + rt4 * 4 + rt5 * 5) / votos;
    
    

    if (votos === 0) {
      sepc.style.display = "block";
      vts.innerHTML = 0;
      pr.innerHTML = 0;
      dis();
    } else {
      pr.innerHTML = promedio.toFixed(1);
      vts.innerHTML = ShortNum(votos);
      sepc.style.display = "none";
      dis();
    }
    

  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}



async function Hit(i){

if (iter == 0) {iter++} else {return;}

try {

if (i === 0) {
  const ratingRef = dbRef.child(`${blogTitle}_${blogID}/${postID}rating1`);
  const snapshot = await ratingRef.once('value');
  const currentValue = snapshot.val() || 0;
  await ratingRef.set(currentValue + 1);
  await dbRef.child(`${blogTitle}_${blogID}/${postID}users/${userID}`).set({ "rating1": true });
} else if (i === 1) {
  const ratingRef = dbRef.child(`${blogTitle}_${blogID}/${postID}rating2`);
  const snapshot = await ratingRef.once('value');
  const currentValue = snapshot.val() || 0;
  await ratingRef.set(currentValue + 1);
  await dbRef.child(`${blogTitle}_${blogID}/${postID}users/${userID}`).set({ "rating2": true });
} else if (i === 2) {
  const ratingRef = dbRef.child(`${blogTitle}_${blogID}/${postID}rating3`);
  const snapshot = await ratingRef.once('value');
  const currentValue = snapshot.val() || 0;
  await ratingRef.set(currentValue + 1);
  await dbRef.child(`${blogTitle}_${blogID}/${postID}users/${userID}`).set({ "rating3": true });
} else if (i === 3) {
  const ratingRef = dbRef.child(`${blogTitle}_${blogID}/${postID}rating4`);
  const snapshot = await ratingRef.once('value');
  const currentValue = snapshot.val() || 0;
  await ratingRef.set(currentValue + 1);
  await dbRef.child(`${blogTitle}_${blogID}/${postID}users/${userID}`).set({ "rating4": true });
} else if (i === 4) {
  const ratingRef = dbRef.child(`${blogTitle}_${blogID}/${postID}rating5`);
  const snapshot = await ratingRef.once('value');
  const currentValue = snapshot.val() || 0;
  await ratingRef.set(currentValue + 1);
  await dbRef.child(`${blogTitle}_${blogID}/${postID}users/${userID}`).set({ "rating5": true });
}

localStorage.setItem(postID, userID);

GetData();
} catch (error) {
console.log(`ERROR: ${error}`);
}
}

async function GTuserDT() {
  const user = dbRef.child(`${blogTitle}_${blogID}/${postID}users/${ew}`);
  const snapshot = await user.once('value');
  const value = snapshot.val();
  return value;
}


function ShortNum(num) {
  const unidades = ['', 'K', 'M', 'B', 'T'];
  const orden = Math.floor(Math.log10(Math.abs(num)) / 3);
  const numeroAcortado = num / Math.pow(1000, orden);
  
  const numeroRedondeado = Number(numeroAcortado.toFixed(2));

  return (num < 0 ? '-' : '') + numeroRedondeado + unidades[orden];
}


function decompress(string) {

var newString = '',
  char, codeStr, firstCharCode, lastCharCode;
string = decodeURIComponent(escape(atob(string)));
for (var i = 0; i < string.length; i++) {
  char = string.charCodeAt(i);
  if (char > 132) {
    codeStr = char.toString(10);

    firstCharCode = parseInt(codeStr.substring(0, codeStr.length - 2), 10);

    lastCharCode = parseInt(codeStr.substring(codeStr.length - 2, codeStr.length), 10) + 31;

    newString += String.fromCharCode(firstCharCode) + String.fromCharCode(lastCharCode);
  } else {
    newString += string.charAt(i);
  }
}
return newString;
}

function dis(){

  ld.classList.add("ofl")
    var elements = circleDiv.getElementsByTagName("span");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add("onl")
    }

}

function generateUserID() {

  if(ew == null){
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 100000);
  return `${timestamp}_${random}`;
  }

  
}



/*No error with offline*/

window.addEventListener("offline",function(){ firebase.database().goOffline(); }),window.addEventListener("online",function(){ firebase.database().goOnline(); }); 

