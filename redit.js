/*Redirector------------------------------------------------------------------------------------>*/

	var allowedHostnames = [blogUrl.split("/")[2], "www.youtube.com", "www.facebook.com", "twitter.com", "www.instagram.com", "pinterest.com", "api.whatsapp.com", "www.linkedin.com", "www.blogger.com", "blogger.googleusercontent.com", "1.bp.blogspot.com", "2.bp.blogspot.com", "3.bp.blogspot.com", "4.bp.blogspot.com", "t.me", "paypal.me", "timeline.line.me", "www.google.com", "policies.google.com", "discord.com", "discord.gg"];

var allahref = document.getElementsByTagName("a");

for (var c = 0; c < allahref.length; c++) {
  if (allahref[c].hostname !== "" && !allowedHostnames.includes(allahref[c].hostname)) {
    var encode = window.btoa(allahref[c].href);
    allahref[c].href = "/p/rdn.html?&&link=" + encode;
  }
}


	/*Redirector------------------------------------------------------------------------------------>*/
