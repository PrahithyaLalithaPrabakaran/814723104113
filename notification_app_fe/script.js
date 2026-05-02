const API ="http://localhost:3000/notifications";
async function loadNotifications(){
    const res = await fetch(API);
    const data = await res.json();
    const list = document.getElementById("list");
    list.innerHTML= "";
    data.forEach(n => {
        const li = document.createElement("li");
        li.innerHTML = `
        ${n.message}
        <button onclick="deleteNotification(${n.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}
async function addNotification(){
    const input = document.getElementById("messageInput");
    const message = input.value;
    if (!message) return;
    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {message})
    });
    input.value = "";
    loadNotifications(); 
}
async function deleteNotification(id){
    await fetch(`${API}/${id}`,{
        method: "DELETE"
    });
    loadNotifications();
}
loadNotifications();