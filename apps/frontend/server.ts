import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { db } from "./src/lib/db.ts";
import { sendContactEmail } from "./src/lib/email.ts";
import { generateReply } from "./src/lib/ai.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact submissions per window
  message: { error: "Too many contact requests. Please try again later." },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Contact Endpoint
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);

      // 1. Save to DB
      const contact = await db.contact.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          message: validatedData.message,
        },
      });

      // 2. Generate AI Reply
      const aiReply = await generateReply(
        validatedData.name,
        validatedData.message,
      );

      // 3. Update DB with AI reply
      await db.contact.update({
        where: { id: contact.id },
        data: { replyContent: aiReply },
      });

      // 4. Send Email via Resend
      await sendContactEmail({
        to: validatedData.email,
        name: validatedData.name,
        message: validatedData.message,
        aiReply: aiReply,
      });

      res
        .status(201)
        .json({
          message: "Contact request processed successfully",
          reply: aiReply,
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      console.error("Contact error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
