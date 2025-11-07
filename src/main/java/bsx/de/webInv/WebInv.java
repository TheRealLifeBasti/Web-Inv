package bsx.de.webInv;

import org.bukkit.Bukkit;
import org.bukkit.OfflinePlayer;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.inventory.ItemStack;
import org.bukkit.plugin.java.JavaPlugin;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.util.*;
import java.util.concurrent.Executors;
import com.google.gson.Gson;

public class WebInv extends JavaPlugin {

    private HttpServer server;
    private final Gson gson = new Gson();

    @Override
    public void onEnable() {
        saveDefaultConfig();
        FileConfiguration cfg = getConfig();
        int port = cfg.getInt("port", 8080);

        try {
            server = HttpServer.create(new InetSocketAddress(port), 0);
            server.createContext("/", this::handleStatic);
            server.createContext("/api/players", this::handlePlayers);
            server.createContext("/api/inventory", this::handleInventory);
            server.createContext("/api/inventory/update", this::handleUpdate);
            server.setExecutor(Executors.newCachedThreadPool());
            server.start();
            getLogger().info("WebInv läuft unter http://localhost:" + port);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onDisable() {
        if (server != null) server.stop(0);
    }

    private void handleStatic(HttpExchange ex) throws IOException {
        String path = ex.getRequestURI().getPath();
        if (path.equals("/")) path = "web/index.html";
        else if (path.startsWith("/web/")) path = path.substring(1);
        else path = "web" + path;

        InputStream is = getClass().getClassLoader().getResourceAsStream(path);
        if (is == null) {
            getLogger().warning("File not found: " + path);
            ex.sendResponseHeaders(404, -1);
            return;
        }

        byte[] bytes = is.readAllBytes();
        String contentType = "text/html";
        if (path.endsWith(".css")) contentType = "text/css";
        else if (path.endsWith(".js")) contentType = "application/javascript";
        else if (path.endsWith(".png")) contentType = "image/png";

        ex.getResponseHeaders().set("Content-Type", contentType);
        ex.sendResponseHeaders(200, bytes.length);
        ex.getResponseBody().write(bytes);
        ex.close();
    }

    private void handlePlayers(HttpExchange ex) throws IOException {
        if (!ex.getRequestMethod().equalsIgnoreCase("GET")) { ex.sendResponseHeaders(405, -1); return; }
        List<String> players = new ArrayList<>();
        for (OfflinePlayer p : Bukkit.getOfflinePlayers()) {
            if (p.getName() != null) players.add(p.getName());
        }
        sendJson(ex, players);
    }

    private void handleInventory(HttpExchange ex) throws IOException {
        if (!ex.getRequestMethod().equalsIgnoreCase("GET")) { ex.sendResponseHeaders(405, -1); return; }
        Map<String, String> q = parseQuery(ex.getRequestURI().getQuery());
        String playerName = q.get("player");
        String type = q.getOrDefault("type", "inventory");

        if (playerName == null) { sendJson(ex, Map.of("error", "missing player")); return; }

        OfflinePlayer player = Bukkit.getOfflinePlayer(playerName);
        ItemStack[] inv;

        if (type.equals("enderchest")) {
            inv = player.isOnline() ? player.getPlayer().getEnderChest().getContents() : new ItemStack[27];
        } else {
            inv = player.isOnline() ? player.getPlayer().getInventory().getContents() : new ItemStack[36];
        }

        Map<Integer, Map<String, Object>> slots = new HashMap<>();
        for (int i = 0; i < inv.length; i++) {
            ItemStack item = inv[i];
            if (item != null) {
                Map<String, Object> info = new HashMap<>();
                info.put("type", item.getType().name());
                info.put("amount", item.getAmount());
                slots.put(i, info);
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("slots", slots);
        response.put("online", player.isOnline());
        sendJson(ex, response);
    }

    private void handleUpdate(HttpExchange ex) throws IOException {
        if (!ex.getRequestMethod().equalsIgnoreCase("POST")) { ex.sendResponseHeaders(405, -1); return; }

        InputStream is = ex.getRequestBody();
        String body = new String(is.readAllBytes());
        Map<String, Object> data = gson.fromJson(body, Map.class);

        String playerName = (String) data.get("player");
        String type = (String) data.get("type");
        int slot = ((Number) data.get("slot")).intValue();
        Map<String, Object> itemData = (Map<String, Object>) data.get("item");

        OfflinePlayer player = Bukkit.getOfflinePlayer(playerName);
        ItemStack item = null;

        if (itemData != null) {
            String mat = (String) itemData.get("type");
            int amount = ((Number) itemData.get("amount")).intValue();
            item = new ItemStack(org.bukkit.Material.valueOf(mat), amount);
        }

        if (player.isOnline()) {
            if (type.equals("enderchest")) player.getPlayer().getEnderChest().setItem(slot, item);
            else player.getPlayer().getInventory().setItem(slot, item);
        }

        sendJson(ex, Map.of("success", true));
    }

    private void sendJson(HttpExchange ex, Object obj) throws IOException {
        byte[] data = gson.toJson(obj).getBytes();
        ex.getResponseHeaders().set("Content-Type", "application/json");
        ex.sendResponseHeaders(200, data.length);
        ex.getResponseBody().write(data);
        ex.close();
    }

    private Map<String, String> parseQuery(String q) {
        Map<String, String> map = new HashMap<>();
        if (q == null) return map;
        for (String part : q.split("&")) {
            String[] kv = part.split("=", 2);
            if (kv.length == 2) map.put(kv[0], kv[1]);
        }
        return map;
    }
}
