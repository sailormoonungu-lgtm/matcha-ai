async function send(){
const msg=document.getElementById('msg').value;
const chat=document.getElementById('chat');
chat.innerHTML += `<p><b>Kamu:</b> ${msg}</p>`;
document.getElementById('msg').value='';
const res=await fetch('/api/chat',{method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({message:msg})});
const data=await res.json();
chat.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
chat.scrollTop=chat.scrollHeight;
}