let currentPlayer = null;
let currentType = "inventory";
let inventory = [];

function createSlot(item, index, online){
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.index = index;

    if(item){
        const img = document.createElement("img");
        img.src = `/web/icons/${item.type.toLowerCase()}.png`;
        img.alt = item.type;
        img.width = 32;
        img.height = 32;
        img.onerror = () => img.src = '/web/icons/missing_texture.png';
        slot.appendChild(img);
    } else slot.classList.add("empty");

    if(!online) slot.style.opacity = "0.5";
    slot.draggable = online;

    slot.addEventListener("dragstart", e=>{
        e.dataTransfer.setData("text/plain", index);
    });

    slot.addEventListener("drop", async e=>{
        e.preventDefault();
        if(!online) return;

        const from = parseInt(e.dataTransfer.getData("text/plain"));
        const to = index;
        if(from === to) return;

        [inventory[from], inventory[to]] = [inventory[to], inventory[from]];

        const invDiv = document.getElementById("inventory");
        invDiv.replaceChild(createSlot(inventory[from], from, online), invDiv.children[from]);
        invDiv.replaceChild(createSlot(inventory[to], to, online), invDiv.children[to]);

        await Promise.all([from, to].map(async slotIndex=>{
            await fetch("/api/inventory/update", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({player: currentPlayer, type: currentType, slot: slotIndex, item: inventory[slotIndex]})
            });
        }));
    });

    slot.addEventListener("dragover", e=>e.preventDefault());
    return slot;
}

function renderInventory(){
    const invDiv = document.getElementById("inventory");
    invDiv.innerHTML = "";
    const online = inventory.online !== false;
    for(let i=0;i<inventory.length;i++){
        invDiv.appendChild(createSlot(inventory[i], i, online));
    }
}

async function loadInventory(type){
    currentType = type;
    const player = document.getElementById("playerSelect").value;
    currentPlayer = player;
    if(!player) return;

    const res = await fetch(`/api/inventory?player=${encodeURIComponent(player)}&type=${type}`);
    const data = await res.json();

    inventory = [];
    const size = type==="enderchest"?27:36;
    for(let i=0;i<size;i++) inventory[i] = data.slots[i] || null;
    inventory.online = data.online;
    renderInventory();
}

async function loadPlayers(){
    const res = await fetch("/api/players");
    const players = await res.json();
    const sel = document.getElementById("playerSelect");
    sel.innerHTML = players.map(p=>`<option>${p}</option>`).join("");
    if(players.length>0) loadInventory(currentType);
}

loadPlayers();
