const { Router } = require("express");
const Canvas = require("canvas");
const fs = require("fs");
const path = require("path");
let route = Router();

const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");

  let fontSize = 60;

  do {
    ctx.font = `${(fontSize -= 10)}px sans-serif`;
  } while (ctx.measureText(text).width > canvas.width - 40);

  return ctx.font;
};

route.get("/", async (req, res, next) => {
  if (!req.query.pfp) return res.json({ error: "No pfp param included!" });
  if (!req.query.username)
    return res.json({ error: "No username param included!" });
  if (!req.query.servername)
    return res.json({ error: "No servername included!" });
  if (!req.query.usercount)
    return res.json({ error: "No userscount usercount included!" });
  console.log(req.query.textcolor);
  const canvas = new Canvas.createCanvas(
    isNaN(req.query.width) ? 700 : parseInt(req.query.width),
    isNaN(req.query.height) ? 250 : parseInt(req.query.height)
  );
  const ctx = canvas.getContext("2d");

  if (req.query.background) {
    const background = await Canvas.loadImage(req.query.background);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

  const avatar = await Canvas.loadImage(req.query.pfp);
  ctx.drawImage(avatar, 25, 25, 150, 150);

  ctx.font = applyText(canvas, req.query.username);
  ctx.fillStyle =
    req.query.textcolor !== null ? "#" + req.query.textcolor : "#000000";
  ctx.fillText(req.query.username, 200, 75);

  ctx.font = applyText(canvas, req.query.servername);
  ctx.fillText("Welcome to " + req.query.servername, 200, 130);
  ctx.font = "bold 16px sans-serif";
  ctx.fillText(`We are now at ${req.query.usercount} members!`, 205, 160);

  let r = Math.random().toString(36).substring(7);

  fs.writeFileSync(
    "./files/usercontent/cards/" + r + ".png",
    canvas.toBuffer()
  );

  res.sendFile(
    path.join(__dirname + "../../../../files/usercontent/cards/" + r + ".png")
  );
});

module.exports = route;
