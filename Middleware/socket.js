const WebSocket = require("ws");

let drivers = [];
let customers = [];

function initWebSocket(server) {
  const wss = new WebSocket.Server({ server, path: "/ws" });

  wss.on("connection", (ws) => {
    console.log("🚀 Một client đã kết nối WebSocket");

    ws.on("message", (message) => {
      let data;
      try {
        data = JSON.parse(message);
      } catch (err) {
        console.error("❌ Lỗi parse JSON:", err);
        return;
      }

      // Lần đầu kết nối: gán role
      if (!ws.role && data.type) {
        ws.role = data.type;
        console.log(`✅ Client xác định vai trò: ${ws.role}`);

        if (ws.role === "driver") drivers.push(ws);
        if (ws.role === "customer") customers.push(ws);

        console.log(
          `Hiện tại có ${drivers.length} driver(s), ${customers.length} customer(s)`
        );
        return;
      }

      // Nếu là driver thì broadcast location cho tất cả customers
      if (ws.role === "driver") {
        const locationPayload = {
          lat: data.lat,
          lng: data.lng,
          speed: data.speed ?? 0,
          status: data.status || "unknown",
          updatedAt: data.updatedAt || new Date().toISOString(),
        };

        console.log("📍 Driver gửi dữ liệu:", locationPayload);

        customers.forEach((customer) => {
          if (customer.readyState === WebSocket.OPEN) {
            customer.send(JSON.stringify(locationPayload));
            console.log("➡️ Đã gửi tới khách hàng:", locationPayload);
          }
        });
      }
    });

    ws.on("close", () => {
      drivers = drivers.filter((d) => d !== ws);
      customers = customers.filter((c) => c !== ws);
      console.log("❌ Client ngắt kết nối");
    });
  });
}

module.exports = initWebSocket;
