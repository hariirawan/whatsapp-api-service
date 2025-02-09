import makeWASocket, {
  useMultiFileAuthState,
  WASocket,
} from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";

let sock: WASocket;

export async function startWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info");
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
  });

  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("connection.update", (update) => {
    const { connection, qr } = update;
    if (qr) {
      qrcode.generate(qr, { small: true });
    }
    if (connection === "close") {
      console.log("Connection closed, reconnecting...");
      setTimeout(startWhatsApp, 5000);
    } else if (connection === "open") {
      console.log("Connected to WhatsApp!");
    }
  });

  sock.ev.on("messages.upsert", async (m) => {
    console.log("Received message:", m);
  });
}

export function getWhatsAppInstance(): WASocket | null {
  return sock || null;
}
