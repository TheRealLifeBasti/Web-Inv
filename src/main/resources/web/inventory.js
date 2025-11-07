let currentPlayer = null;
let currentType = "inventory";
let inventory = [];
let selectedSlot = null;
let allItems = [
    // Tools & Weapons
    'wooden_sword', 'wooden_shovel', 'wooden_pickaxe', 'wooden_axe', 'wooden_hoe',
    'stone_sword', 'stone_shovel', 'stone_pickaxe', 'stone_axe', 'stone_hoe',
    'iron_sword', 'iron_shovel', 'iron_pickaxe', 'iron_axe', 'iron_hoe',
    'golden_sword', 'golden_shovel', 'golden_pickaxe', 'golden_axe', 'golden_hoe',
    'diamond_sword', 'diamond_shovel', 'diamond_pickaxe', 'diamond_axe', 'diamond_hoe',
    'netherite_sword', 'netherite_shovel', 'netherite_pickaxe', 'netherite_axe', 'netherite_hoe',

    // Armor
    'leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots',
    'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots',
    'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots',
    'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots',
    'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots',
    'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots',
    'turtle_helmet',

    // Combat Items
    'bow', 'crossbow', 'shield', 'fishing_rod', 'shears', 'flint_and_steel',
    'arrow', 'spectral_arrow', 'tipped_arrow',
    'snowball', 'egg', 'ender_pearl', 'eye_of_ender',
    'fire_charge', 'wind_charge', 'totem_of_undying',

    // Potions & Consumables
    'potion', 'splash_potion', 'lingering_potion',
    'apple', 'golden_apple', 'enchanted_golden_apple',
    'bread', 'cooked_beef', 'cooked_porkchop', 'cooked_mutton', 'cooked_chicken', 'cooked_rabbit', 'cooked_cod', 'cooked_salmon',
    'beef', 'porkchop', 'mutton', 'chicken', 'rabbit', 'cod', 'salmon', 'tropical_fish', 'pufferfish',
    'carrot', 'potato', 'baked_potato', 'poisonous_potato', 'beetroot', 'beetroot_soup',
    'cookie', 'cake', 'pumpkin_pie', 'mushroom_stew', 'rabbit_stew', 'suspicious_stew',
    'milk_bucket', 'water_bucket', 'lava_bucket', 'powder_snow_bucket',
    'honey_bottle', 'experience_bottle',

    // Materials
    'coal', 'charcoal', 'diamond', 'emerald', 'lapis_lazuli', 'amethyst_shard', 'raw_iron', 'iron_ingot', 'raw_copper', 'copper_ingot', 'raw_gold', 'gold_ingot', 'netherite_ingot', 'netherite_scrap',
    'stick', 'string', 'leather', 'feather', 'bone', 'bone_meal', 'blaze_rod', 'blaze_powder',
    'gunpowder', 'redstone', 'glowstone_dust', 'sugar', 'wheat', 'wheat_seeds',
    'paper', 'book', 'writable_book', 'written_book', 'map', 'compass', 'clock',
    'spyglass', 'goat_horn', 'brush', 'bundle',

    // Building Blocks
    'dirt', 'grass_block', 'podzol', 'mycelium', 'farmland', 'dirt_path',
    'stone', 'cobblestone', 'mossy_cobblestone', 'stone_bricks', 'mossy_stone_bricks', 'cracked_stone_bricks', 'chiseled_stone_bricks',
    'deepslate', 'cobbled_deepslate', 'polished_deepslate', 'deepslate_bricks', 'deepslate_tiles',
    'sand', 'red_sand', 'gravel', 'clay', 'terracotta', 'white_terracotta', 'orange_terracotta', 'magenta_terracotta', 'light_blue_terracotta', 'yellow_terracotta', 'lime_terracotta', 'pink_terracotta', 'gray_terracotta', 'light_gray_terracotta', 'cyan_terracotta', 'purple_terracotta', 'blue_terracotta', 'brown_terracotta', 'green_terracotta', 'red_terracotta', 'black_terracotta',
    'sandstone', 'chiseled_sandstone', 'cut_sandstone', 'smooth_sandstone', 'red_sandstone', 'chiseled_red_sandstone', 'cut_red_sandstone', 'smooth_red_sandstone',
    'prismarine', 'prismarine_bricks', 'dark_prismarine', 'sea_lantern',
    'netherrack', 'nether_bricks', 'red_nether_bricks', 'cracked_nether_bricks', 'chiseled_nether_bricks',
    'blackstone', 'polished_blackstone', 'polished_blackstone_bricks', 'gilded_blackstone',
    'end_stone', 'end_stone_bricks', 'purpur_block', 'purpur_pillar',
    'quartz_block', 'chiseled_quartz_block', 'quartz_pillar', 'smooth_quartz',
    'obsidian', 'crying_obsidian', 'ancient_debris',
    'bedrock', 'sponge', 'wet_sponge', 'glass', 'tinted_glass',

    // Ores & Minerals
    'coal_ore', 'deepslate_coal_ore', 'iron_ore', 'deepslate_iron_ore', 'copper_ore', 'deepslate_copper_ore',
    'gold_ore', 'deepslate_gold_ore', 'redstone_ore', 'deepslate_redstone_ore', 'emerald_ore', 'deepslate_emerald_ore',
    'lapis_ore', 'deepslate_lapis_ore', 'diamond_ore', 'deepslate_diamond_ore', 'nether_gold_ore', 'nether_quartz_ore',

    // Wood & Plants
    'oak_log', 'spruce_log', 'birch_log', 'jungle_log', 'acacia_log', 'dark_oak_log', 'mangrove_log', 'cherry_log', 'crimson_stem', 'warped_stem',
    'oak_planks', 'spruce_planks', 'birch_planks', 'jungle_planks', 'acacia_planks', 'dark_oak_planks', 'mangrove_planks', 'cherry_planks', 'crimson_planks', 'warped_planks',
    'oak_leaves', 'spruce_leaves', 'birch_leaves', 'jungle_leaves', 'acacia_leaves', 'dark_oak_leaves', 'mangrove_leaves', 'cherry_leaves',
    'grass', 'tall_grass', 'fern', 'large_fern', 'dead_bush', 'dandelion', 'poppy', 'blue_orchid', 'allium', 'azure_bluet', 'red_tulip', 'orange_tulip', 'white_tulip', 'pink_tulip', 'oxeye_daisy', 'cornflower', 'lily_of_the_valley', 'wither_rose', 'sunflower', 'lilac', 'rose_bush', 'peony',
    'brown_mushroom', 'red_mushroom', 'crimson_fungus', 'warped_fungus', 'nether_wart', 'warped_wart_block', 'shroomlight',
    'sugar_cane', 'kelp', 'bamboo', 'cactus', 'vine', 'glow_lichen', 'hanging_roots', 'rooted_dirt',
    'lily_pad', 'seagrass', 'sea_pickle', 'coral', 'coral_block', 'coral_fan',
    'pumpkin', 'carved_pumpkin', 'jack_o_lantern', 'melon', 'chorus_plant', 'chorus_flower',

    // Functional Blocks
    'chest', 'trapped_chest', 'ender_chest', 'barrel', 'shulker_box', 'white_shulker_box', 'orange_shulker_box', 'magenta_shulker_box', 'light_blue_shulker_box', 'yellow_shulker_box', 'lime_shulker_box', 'pink_shulker_box', 'gray_shulker_box', 'light_gray_shulker_box', 'cyan_shulker_box', 'purple_shulker_box', 'blue_shulker_box', 'brown_shulker_box', 'green_shulker_box', 'red_shulker_box', 'black_shulker_box',
    'furnace', 'blast_furnace', 'smoker', 'campfire', 'soul_campfire',
    'crafting_table', 'cartography_table', 'fletching_table', 'smithing_table', 'loom', 'stonecutter', 'grindstone', 'anvil', 'chipped_anvil', 'damaged_anvil',
    'enchanting_table', 'brewing_stand', 'cauldron', 'lectern', 'bookshelf',
    'composter', 'jukebox', 'note_block', 'bell', 'beacon', 'conduit',
    'hopper', 'dropper', 'dispenser', 'observer', 'comparator', 'repeater',
    'piston', 'sticky_piston', 'slime_block', 'honey_block', 'observer',
    'tnt', 'redstone_lamp', 'target', 'sculk_sensor', 'calibrated_sculk_sensor', 'sculk_shrieker', 'sculk_catalyst',
    'respawn_anchor', 'lodestone', 'lightning_rod', 'copper_bulb', 'exposed_copper_bulb', 'weathered_copper_bulb', 'oxidized_copper_bulb',
    'copper_grate', 'exposed_copper_grate', 'weathered_copper_grate', 'oxidized_copper_grate',
    'copper_door', 'exposed_copper_door', 'weathered_copper_door', 'oxidized_copper_door',
    'copper_trapdoor', 'exposed_copper_trapdoor', 'weathered_copper_trapdoor', 'oxidized_copper_trapdoor',

    // Redstone
    'redstone_wire', 'redstone_torch', 'redstone_wall_torch', 'redstone_block', 'redstone_lamp',
    'lever', 'stone_button', 'oak_button', 'stone_pressure_plate', 'light_weighted_pressure_plate', 'heavy_weighted_pressure_plate',
    'oak_pressure_plate', 'iron_door', 'oak_door', 'iron_trapdoor', 'oak_trapdoor',
    'oak_fence_gate', 'tripwire_hook', 'daylight_detector', 'rail', 'powered_rail', 'detector_rail', 'activator_rail',
    'minecart', 'chest_minecart', 'furnace_minecart', 'tnt_minecart', 'hopper_minecart', 'command_block_minecart',

    // Transportation
    'boat', 'chest_boat', 'minecart', 'chest_minecart', 'furnace_minecart', 'tnt_minecart', 'hopper_minecart',
    'oak_boat', 'oak_chest_boat', 'spruce_boat', 'spruce_chest_boat', 'birch_boat', 'birch_chest_boat', 'jungle_boat', 'jungle_chest_boat', 'acacia_boat', 'acacia_chest_boat', 'dark_oak_boat', 'dark_oak_chest_boat', 'mangrove_boat', 'mangrove_chest_boat', 'cherry_boat', 'cherry_chest_boat',
    'saddle', 'horse_armor_diamond', 'horse_armor_gold', 'horse_armor_iron', 'horse_armor_leather',
    'elytra', 'firework_rocket', 'firework_star',

    // Decorative
    'torch', 'soul_torch', 'redstone_torch', 'lantern', 'soul_lantern',
    'armor_stand', 'item_frame', 'glow_item_frame', 'painting',
    'sign', 'oak_sign', 'spruce_sign', 'birch_sign', 'jungle_sign', 'acacia_sign', 'dark_oak_sign', 'mangrove_sign', 'cherry_sign', 'crimson_sign', 'warped_sign',
    'banner', 'white_banner', 'orange_banner', 'magenta_banner', 'light_blue_banner', 'yellow_banner', 'lime_banner', 'pink_banner', 'gray_banner', 'light_gray_banner', 'cyan_banner', 'purple_banner', 'blue_banner', 'brown_banner', 'green_banner', 'red_banner', 'black_banner',
    'bed', 'white_bed', 'orange_bed', 'magenta_bed', 'light_blue_bed', 'yellow_bed', 'lime_bed', 'pink_bed', 'gray_bed', 'light_gray_bed', 'cyan_bed', 'purple_bed', 'blue_bed', 'brown_bed', 'green_bed', 'red_bed', 'black_bed',
    'carpet', 'white_carpet', 'orange_carpet', 'magenta_carpet', 'light_blue_carpet', 'yellow_carpet', 'lime_carpet', 'pink_carpet', 'gray_carpet', 'light_gray_carpet', 'cyan_carpet', 'purple_carpet', 'blue_carpet', 'brown_carpet', 'green_carpet', 'red_carpet', 'black_carpet',
    'wool', 'white_wool', 'orange_wool', 'magenta_wool', 'light_blue_wool', 'yellow_wool', 'lime_wool', 'pink_wool', 'gray_wool', 'light_gray_wool', 'cyan_wool', 'purple_wool', 'blue_wool', 'brown_wool', 'green_wool', 'red_wool', 'black_wool',
    'concrete', 'white_concrete', 'orange_concrete', 'magenta_concrete', 'light_blue_concrete', 'yellow_concrete', 'lime_concrete', 'pink_concrete', 'gray_concrete', 'light_gray_concrete', 'cyan_concrete', 'purple_concrete', 'blue_concrete', 'brown_concrete', 'green_concrete', 'red_concrete', 'black_concrete',
    'concrete_powder', 'white_concrete_powder', 'orange_concrete_powder', 'magenta_concrete_powder', 'light_blue_concrete_powder', 'yellow_concrete_powder', 'lime_concrete_powder', 'pink_concrete_powder', 'gray_concrete_powder', 'light_gray_concrete_powder', 'cyan_concrete_powder', 'purple_concrete_powder', 'blue_concrete_powder', 'brown_concrete_powder', 'green_concrete_powder', 'red_concrete_powder', 'black_concrete_powder',
    'stained_glass', 'white_stained_glass', 'orange_stained_glass', 'magenta_stained_glass', 'light_blue_stained_glass', 'yellow_stained_glass', 'lime_stained_glass', 'pink_stained_glass', 'gray_stained_glass', 'light_gray_stained_glass', 'cyan_stained_glass', 'purple_stained_glass', 'blue_stained_glass', 'brown_stained_glass', 'green_stained_glass', 'red_stained_glass', 'black_stained_glass',
    'stained_glass_pane', 'white_stained_glass_pane', 'orange_stained_glass_pane', 'magenta_stained_glass_pane', 'light_blue_stained_glass_pane', 'yellow_stained_glass_pane', 'lime_stained_glass_pane', 'pink_stained_glass_pane', 'gray_stained_glass_pane', 'light_gray_stained_glass_pane', 'cyan_stained_glass_pane', 'purple_stained_glass_pane', 'blue_stained_glass_pane', 'brown_stained_glass_pane', 'green_stained_glass_pane', 'red_stained_glass_pane', 'black_stained_glass_pane',
    'glazed_terracotta', 'white_glazed_terracotta', 'orange_glazed_terracotta', 'magenta_glazed_terracotta', 'light_blue_glazed_terracotta', 'yellow_glazed_terracotta', 'lime_glazed_terracotta', 'pink_glazed_terracotta', 'gray_glazed_terracotta', 'light_gray_glazed_terracotta', 'cyan_glazed_terracotta', 'purple_glazed_terracotta', 'blue_glazed_terracotta', 'brown_glazed_terracotta', 'green_glazed_terracotta', 'red_glazed_terracotta', 'black_glazed_terracotta',

    // Spawn Eggs
    'allay_spawn_egg', 'axolotl_spawn_egg', 'bat_spawn_egg', 'bee_spawn_egg', 'blaze_spawn_egg', 'camel_spawn_egg', 'cat_spawn_egg', 'cave_spider_spawn_egg', 'chicken_spawn_egg', 'cod_spawn_egg', 'cow_spawn_egg', 'creeper_spawn_egg', 'dolphin_spawn_egg', 'donkey_spawn_egg', 'drowned_spawn_egg', 'elder_guardian_spawn_egg', 'ender_dragon_spawn_egg', 'enderman_spawn_egg', 'endermite_spawn_egg', 'evoker_spawn_egg', 'fox_spawn_egg', 'frog_spawn_egg', 'ghast_spawn_egg', 'glow_squid_spawn_egg', 'goat_spawn_egg', 'guardian_spawn_egg', 'hoglin_spawn_egg', 'horse_spawn_egg', 'husk_spawn_egg', 'iron_golem_spawn_egg', 'llama_spawn_egg', 'magma_cube_spawn_egg', 'mooshroom_spawn_egg', 'mule_spawn_egg', 'ocelot_spawn_egg', 'panda_spawn_egg', 'parrot_spawn_egg', 'phantom_spawn_egg', 'pig_spawn_egg', 'piglin_spawn_egg', 'piglin_brute_spawn_egg', 'pillager_spawn_egg', 'polar_bear_spawn_egg', 'pufferfish_spawn_egg', 'rabbit_spawn_egg', 'ravager_spawn_egg', 'salmon_spawn_egg', 'sheep_spawn_egg', 'shulker_spawn_egg', 'silverfish_spawn_egg', 'skeleton_spawn_egg', 'skeleton_horse_spawn_egg', 'slime_spawn_egg', 'sniffer_spawn_egg', 'snow_golem_spawn_egg', 'spider_spawn_egg', 'squid_spawn_egg', 'stray_spawn_egg', 'strider_spawn_egg', 'tadpole_spawn_egg', 'trader_llama_spawn_egg', 'tropical_fish_spawn_egg', 'turtle_spawn_egg', 'vex_spawn_egg', 'villager_spawn_egg', 'vindicator_spawn_egg', 'wandering_trader_spawn_egg', 'warden_spawn_egg', 'witch_spawn_egg', 'wither_spawn_egg', 'wither_skeleton_spawn_egg', 'wolf_spawn_egg', 'zoglin_spawn_egg', 'zombie_spawn_egg', 'zombie_horse_spawn_egg', 'zombie_villager_spawn_egg', 'zombified_piglin_spawn_egg',

    // Miscellaneous
    'dragon_egg', 'structure_block', 'jigsaw', 'command_block', 'repeating_command_block', 'chain_command_block', 'structure_void', 'barrier', 'light', 'spawner', 'trial_spawner', 'vault'
];

function createSlot(item, index, online) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.index = index;

    if (item) {
        const img = document.createElement("img");
        const itemName = item.type.toLowerCase();
        img.src = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/item/${itemName}.png`;
        img.alt = item.type;
        img.onerror = () => {
            img.src = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/block/${itemName}.png`;
            img.onerror = () => {
                if (itemName === 'ender_chest') {
                    img.src = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/block/ender_chest.png`;
                    img.onerror = () => { img.src = 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/item/barrier.png'; };
                } else {
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

        // Tooltip mit Anzahl am Anfang
        const tooltip = document.createElement("div");
        tooltip.className = "item-tooltip";
        const displayName = item.type.replace(/_/g, ' ');
        tooltip.textContent = item.count && item.count > 1 ? `x${item.count} ${displayName}` : displayName;
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

    // Click zum Auswählen
    slot.addEventListener("click", () => {
        if (!online) return;
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        selectedSlot = index;
        updateAmountChanger();
    });

    slot.addEventListener("dragstart", e => {
        slot.classList.add("dragging");
        e.dataTransfer.setData("text/plain", JSON.stringify({
            index: index,
            type: item ? item.type : null,
            count: item ? item.count : 0
        }));
        e.dataTransfer.effectAllowed = "move";
    });

    slot.addEventListener("dragend", e => {
        slot.classList.remove("dragging");
    });

    slot.addEventListener("drop", async e => {
        e.preventDefault();
        e.stopPropagation();
        if (!online) return;

        try {
            const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));

            if (dragData.fromCreative) {
                if (!currentPlayer) {
                    alert("Bitte wähle zuerst einen Spieler aus!");
                    return;
                }

                // Popup für Anzahl
                const amount = prompt("Anzahl (1-64):", "1");
                if (amount === null) return; // Abgebrochen

                const num = parseInt(amount);
                if (isNaN(num) || num < 1 || num > 64) {
                    alert("Bitte gib eine Zahl zwischen 1 und 64 ein!");
                    return;
                }

                if (inventory[index]) {
                    if (inventory[index].type === dragData.type && inventory[index].count < 64) {
                        inventory[index].count = Math.min(64, inventory[index].count + num);
                    } else {
                        inventory[index] = { type: dragData.type, count: num };
                    }
                } else {
                    inventory[index] = { type: dragData.type, count: num };
                }

                const invDiv = document.getElementById("inventory");
                const slots = invDiv.children;
                if (slots[index]) slots[index].replaceWith(createSlot(inventory[index], index, online));

                await fetch("/api/inventory/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        player: currentPlayer,
                        type: currentType,
                        slot: index,
                        item: inventory[index] ? { type: inventory[index].type, amount: inventory[index].count } : null
                    })
                });
            } else {
                const from = dragData.index;
                const to = index;
                if (from === to) return;

                [inventory[from], inventory[to]] = [inventory[to], inventory[from]];

                const invDiv = document.getElementById("inventory");
                const slots = invDiv.children;
                if (slots[from]) slots[from].replaceWith(createSlot(inventory[from], from, online));
                if (slots[to]) slots[to].replaceWith(createSlot(inventory[to], to, online));

                await fetch("/api/inventory/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        player: currentPlayer,
                        type: currentType,
                        slot: from,
                        item: inventory[from] ? { type: inventory[from].type, amount: inventory[from].count } : null
                    })
                });

                await fetch("/api/inventory/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        player: currentPlayer,
                        type: currentType,
                        slot: to,
                        item: inventory[to] ? { type: inventory[to].type, amount: inventory[to].count } : null
                    })
                });
            }
        } catch (err) {
            console.error("Drop error:", err);
        }

        slot.classList.remove("drag-over");
    });

    slot.addEventListener("dragover", e => {
        e.preventDefault();
        const dragData = e.dataTransfer.types.includes('text/plain');
        if (dragData) {
            e.dataTransfer.dropEffect = "copy";
        }
    });

    slot.addEventListener("dragenter", e => {
        e.preventDefault();
        slot.classList.add("drag-over");
    });

    slot.addEventListener("dragleave", e => {
        e.preventDefault();
        slot.classList.remove("drag-over");
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
    for (let i = 0; i < size; i++) {
        const slotData = data.slots[i];
        if (slotData) {
            inventory[i] = { type: slotData.type, count: slotData.amount };
        } else {
            inventory[i] = null;
        }
    }
    inventory.online = data.online;

    renderInventory();
}

function switchTab(type) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    loadInventory(type);
}

async function loadPlayers() {
    const res = await fetch("/api/players");
    const players = await res.json();
    const sel = document.getElementById("playerSelect");
    sel.innerHTML = '<option value="">Spieler auswählen...</option>' + players.map(p => `<option value="${p}">${p}</option>`).join("");

    if (players.length > 0) {
        sel.value = players[0];
        loadInventory(currentType);
    }
}

function createCreativeItem(itemName) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "creative-item";
    itemDiv.draggable = true;
    itemDiv.dataset.item = itemName;

    const img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/item/${itemName}.png`;
    img.alt = itemName;
    img.onerror = () => {
        img.src = `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/block/${itemName}.png`;
        img.onerror = () => { img.src = 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/item/barrier.png'; };
    };

    img.style.width = "32px";
    img.style.height = "32px";
    img.style.imageRendering = "pixelated";

    itemDiv.appendChild(img);

    const tooltip = document.createElement("div");
    tooltip.className = "creative-tooltip";
    tooltip.textContent = itemName.replace(/_/g, ' ');
    itemDiv.appendChild(tooltip);

    itemDiv.addEventListener("dragstart", e => {
        itemDiv.classList.add("dragging");
        e.dataTransfer.setData("text/plain", JSON.stringify({
            type: itemName,
            fromCreative: true
        }));
        e.dataTransfer.effectAllowed = "copy";
    });

    itemDiv.addEventListener("dragend", e => {
        itemDiv.classList.remove("dragging");
    });

    return itemDiv;
}

function loadCreativeMenu() {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    allItems.forEach(itemName => {
        itemList.appendChild(createCreativeItem(itemName));
    });
}

function setupTrashBin() {
    const trashBin = document.getElementById("trashBin");

    trashBin.addEventListener("dragover", e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        trashBin.style.background = "#dc3545";
    });

    trashBin.addEventListener("dragleave", e => {
        trashBin.style.background = "#252525";
    });

    trashBin.addEventListener("drop", async e => {
        e.preventDefault();
        trashBin.style.background = "#252525";

        if (!currentPlayer) return;

        const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));
        if (!dragData.fromCreative && dragData.index !== undefined) {
            inventory[dragData.index] = null;

            const invDiv = document.getElementById("inventory");
            const slots = invDiv.children;
            if (slots[dragData.index]) {
                slots[dragData.index].replaceWith(createSlot(null, dragData.index, inventory.online !== false));
            }

            await fetch("/api/inventory/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ player: currentPlayer, type: currentType, slot: dragData.index, item: null })
            });
        }
    });
}

function setupClearInventory() {
    const clearBtn = document.getElementById("clearInventoryBtn");
    const modal = document.getElementById("confirmModal");
    const cancelBtn = document.getElementById("cancelClear");
    const confirmBtn = document.getElementById("confirmClear");

    clearBtn.addEventListener("click", () => {
        if (!currentPlayer) {
            alert("Bitte wähle zuerst einen Spieler aus!");
            return;
        }
        modal.style.display = "block";
    });

    cancelBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    confirmBtn.addEventListener("click", async () => {
        modal.style.display = "none";

        for (let i = 0; i < inventory.length; i++) {
            inventory[i] = null;
            await fetch("/api/inventory/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ player: currentPlayer, type: currentType, slot: i, item: null })
            });
        }

        renderInventory();
    });

    window.addEventListener("click", e => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

function setupItemSearch() {
    const searchInput = document.getElementById("itemSearch");
    const itemList = document.getElementById("itemList");

    searchInput.addEventListener("input", e => {
        const searchTerm = e.target.value.toLowerCase();
        const items = itemList.children;

        for (let item of items) {
            const itemName = item.dataset.item;
            if (itemName.toLowerCase().includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    });
}

function updateAmountChanger() {
    const amountInput = document.getElementById("amountInput");
    const amountDisplay = document.getElementById("amountDisplay");

    if (selectedSlot !== null && inventory[selectedSlot]) {
        amountInput.value = inventory[selectedSlot].count || 1;
        amountInput.disabled = false;
        amountDisplay.textContent = `Slot ${selectedSlot + 1}: ${inventory[selectedSlot].type}`;
    } else {
        amountInput.value = 1;
        amountInput.disabled = true;
        amountDisplay.textContent = "Kein Slot ausgewählt";
    }
}

async function changeAmount() {
    if (selectedSlot === null || !inventory[selectedSlot]) return;

    const amountInput = document.getElementById("amountInput");
    const newAmount = parseInt(amountInput.value);

    if (isNaN(newAmount) || newAmount < 1 || newAmount > 64) {
        alert("Bitte gib eine Zahl zwischen 1 und 64 ein!");
        amountInput.value = inventory[selectedSlot].count;
        return;
    }

    inventory[selectedSlot].count = newAmount;

    const invDiv = document.getElementById("inventory");
    const slots = invDiv.children;
    if (slots[selectedSlot]) {
        const newSlot = createSlot(inventory[selectedSlot], selectedSlot, inventory.online !== false);
        slots[selectedSlot].replaceWith(newSlot);
        newSlot.classList.add('selected');
    }

    await fetch("/api/inventory/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            player: currentPlayer,
            type: currentType,
            slot: selectedSlot,
            item: { type: inventory[selectedSlot].type, amount: inventory[selectedSlot].count }
        })
    });
}

loadPlayers();
loadCreativeMenu();
setupTrashBin();
setupClearInventory();
setupItemSearch();