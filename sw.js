
const andi = () => {

    if (Notification.permission === "default") {
      Notification.requestPermission().then(perm => {
        if (Notification.permission === "granted") {
          regWorker().catch(err => console.error(err));
        } else {
          alert("Please allow notifications.");
        }
      });
    }

    else if (Notification.permission === "granted") {
      regWorker().catch(err => console.error(err));
    }
   

    else { alert("Please allow notifications."); }
  };


async function regWorker () {

    const publicKey = "BIffgIL0hXo_ZwOWJngnn8-LvjNUbM2zdlT1_HupdD9uqWouQT0PhZPdEJ37PsyQ7-L1cng6xZ-IBGoN8KrRr_0";

    navigator.serviceWorker.register("https://cdn.jsdelivr.net/gh/tu-usuario/tu-repo/sw.js");

    navigator.serviceWorker.ready
    .then(reg => {
      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey
      }).then(

        sub => {
          fetch("https://test-andiyt1.vercel.app/welcome", {
            method: "POST",
            body: JSON.stringify(sub),
            headers: { "content-type": "application/json" }
          })
          .then(res => res.text())
          .then(txt => console.log(txt))
          .catch(err => console.error(err));
        },
   
        err => console.error(err)
      );
    });
  }

  self.addEventListener("install", evt => self.skipWaiting());

self.addEventListener("activate", evt => self.clients.claim());
 

self.addEventListener("push", evt => {
  const data = evt.data.json();
  // console.log("Push", data);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    image: data.image
  });
});

// Service Worker
self.addEventListener("notificationclick", function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data.link) // Abre la URL al hacer clic
    );
  });
  
