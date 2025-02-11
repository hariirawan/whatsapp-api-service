import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authMiddleware from "./middlewares/auth";
import {
  startWhatsApp,
  getWhatsAppInstance,
} from "./services/whatsapp-service";

dotenv.config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
}

// Mulai koneksi WhatsApp
(async () => {
  await startWhatsApp();
})();

app.get(
  "/account",
  authMiddleware,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const sock = getWhatsAppInstance();
      if (!sock || !sock.user) {
        res
          .status(400)
          .json({ success: false, message: "No account is logged in" });
        return;
      }
      res.json({ success: true, user: sock.user });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  }
);

app.post(
  "/send",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { number, message } = req.body;
      const sock = getWhatsAppInstance();

      if (!sock) {
        res
          .status(400)
          .json({ success: false, message: "WhatsApp is not initialized" });
        return;
      }

      const formattedNumber = number.includes("@s.whatsapp.net")
        ? number
        : `${number}@s.whatsapp.net`;

      await sock.sendMessage(formattedNumber, { text: message });

      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
