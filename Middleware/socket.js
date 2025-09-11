const WebSocket = require("ws");

let drivers = [];
let customers = [];

function initWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Một client đã kết nối WebSocket");

  ws.on("message", (message) => {
  const data = JSON.parse(message);

  if (!ws.role && data.type) {
    ws.role = data.type;
    console.log(`✅ Client xác định vai trò: ${ws.role}`);

    if (ws.role === "driver") drivers.push(ws);
    if (ws.role === "customer") customers.push(ws);

    console.log(`Hiện tại có ${drivers.length} driver(s), ${customers.length} customer(s)`);
  } else if (ws.role === "driver") {
    console.log("📍 Driver gửi dữ liệu:", data);
    // gửi tới tất cả khách hàng
    customers.forEach((customer) => {
      if (customer.readyState === WebSocket.OPEN) {
        customer.send(message);
        console.log("➡️ Đã gửi tới khách hàng:", data);
      }
    });
  }
});



    ws.on("close", () => {
      drivers = drivers.filter((d) => d !== ws);
      customers = customers.filter((c) => c !== ws);
    });
  });
}

module.exports = initWebSocket;
