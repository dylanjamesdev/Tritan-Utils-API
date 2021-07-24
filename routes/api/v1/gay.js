const Canvas = require("canvas");
const { Router } = require("express");
const fs = require("fs");
const path = require("path");
let route = Router();

route.get("/:pfp?", async (req, res, next) => {
  if (!req.query.pfp) return res.json({ error: "No avatar param specified" });

  const canvas = new Canvas.createCanvas(250, 250);
  const ctx = canvas.getContext("2d");

  try {
    const avatar = await Canvas.loadImage(req.query.pfp);
    ctx.drawImage(avatar, 0, 0, 250, 250);
  } catch (e) {
    return res.json({ error: "Profile picture not of type JPG" });
  }

  ctx.globalAlpha = 0.5;
  const pride = await Canvas.loadImage(
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8IPcMYSZHg3Ajz-PhJR_hAHaEk%26pid%3DApi&f=1"
  );
  ctx.drawImage(pride, 0, 0, 250, 250);

  let r = Math.random().toString(36).substring(7);

  fs.writeFileSync("./files/usercontent/pfp/" + r + ".png", canvas.toBuffer());

  res.sendFile(
    path.join(__dirname + "../../../files/usercontent/pfp/" + r + ".png")
  );
});

module.exports = route;
