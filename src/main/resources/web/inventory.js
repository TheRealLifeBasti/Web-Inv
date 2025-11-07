let currentPlayer = null;
let currentType = "inventory";
let inventory = [];

function createSlot(item, index, online) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.index = index;

    if (item) {
        const img = document.createElement("img");

        // Use online Minecraft item assets with proper fallback chain
        const itemName = item.type.toLowerCase();
        img.src = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/item/${itemName}.png`;
        img.alt = item.type;
        img.onerror = () => {
            // Fallback to block textures if item texture doesn't exist
            img.src = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/block/${itemName}.png`;
            img.onerror = () => {
                // Special handling for ender chest
                if (itemName === 'ender_chest') {
                    img.src = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/block/ender_chest.png`;
                    img.onerror = () => { img.src = 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/item/barrier.png'; };
                } else {
                    // Try entity textures as final fallback - check for spawn eggs first
                    if (itemName.includes('_spawn_egg')) {
                        const entityName = itemName.replace('_spawn_egg', '');
                        img.src = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/entity/${entityName}.png`;
                        img.onerror = () => { img.src = 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/item/barrier.png'; };
                    } else {
                        img.src = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/entity/${itemName}.png`;
                        img.onerror = () => { img.src = 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/item/barrier.png'; };
                    }
                }
            };
        };

        img.style.width = "32px";
        img.style.height = "32px";
        img.style.imageRendering = "pixelated";
        slot.appendChild(img);

        // Create tooltip element
        const tooltip = document.createElement("div");
        tooltip.className = "item-tooltip";
        tooltip.textContent = `${item.count && item.count > 1 ? `x${item.count} ` : ''}${item.type}`;
        slot.appendChild(tooltip);

        if (item.count && item.count > 1) {
            const countDiv = document.createElement("div");
            countDiv.className = "item-count";
            countDiv.textContent = item.count;
            slot.appendChild(countDiv);
        }
    } else {
        slot.classList.add("empty");
    }

    if (!online) slot.style.opacity = "0.5";
    slot.draggable = online;

    slot.addEventListener("dragstart", e => {
        slot.classList.add("dragging");
        e.dataTransfer.setData("text/plain", index);
        e.dataTransfer.effectAllowed = "move";
    });

    slot.addEventListener("dragend", e => {
        slot.classList.remove("dragging");
    });

    slot.addEventListener("drop", async e => {
        e.preventDefault();
        if (!online) return;

        const from = parseInt(e.dataTransfer.getData("text/plain"));
        const to = index;
        if (from === to) return;

        // swap
        [inventory[from], inventory[to]] = [inventory[to], inventory[from]];

        const invDiv = document.getElementById("inventory");
        const slots = invDiv.children;
        if (slots[from]) slots[from].replaceWith(createSlot(inventory[from], from, online));
        if (slots[to]) slots[to].replaceWith(createSlot(inventory[to], to, online));

        await fetch("/api/inventory/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ player: currentPlayer, type: currentType, slot: from, item: inventory[from] })
        });

        await fetch("/api/inventory/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ player: currentPlayer, type: currentType, slot: to, item: inventory[to] })
        });
    });

    slot.addEventListener("dragover", e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    });

    return slot;
}

function renderInventory() {
    const invDiv = document.getElementById("inventory");
    invDiv.innerHTML = "";
    const online = inventory.online !== false;
    for (let i = 0; i < inventory.length; i++) {
        invDiv.appendChild(createSlot(inventory[i], i, online));
    }
}

async function loadInventory(type) {
    currentType = type;
    const player = document.getElementById("playerSelect").value;
    currentPlayer = player;
    if (!player) return;

    const res = await fetch(`/api/inventory?player=${encodeURIComponent(player)}&type=${type}`);
    const data = await res.json();

    inventory = [];
    const size = type === "enderchest" ? 27 : 36;
    for (let i = 0; i < size; i++) inventory[i] = data.slots[i] || null;
    inventory.online = data.online;

    renderInventory();
}

function switchTab(type) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Load inventory for the selected tab
    loadInventory(type);
}

async function loadPlayers() {
    const res = await fetch("/api/players");
    const players = await res.json();
    const sel = document.getElementById("playerSelect");
    sel.innerHTML = '<option value="">Spieler auswählen...</option>' + players.map(p => `<option value="${p}">${p}</option>`).join("");

    // Auto-load first player's inventory if available
    if (players.length > 0) {
        sel.value = players[0];
        loadInventory(currentType);
    }
}

loadPlayers();
e