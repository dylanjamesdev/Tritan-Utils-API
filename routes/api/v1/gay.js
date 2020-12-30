const { createCanvas, loadImage } = require("canvas");

route.get("/:pfp?avatar", async (req, res, next) => {
  if (!req.query.avatar)
    return res.json({ error: "No avatar param specified" });

  const canvas = createCanvas(
    req.query.width !== null ? req.query.width : 700,
    req.query.height !== null ? req.querys.height : 250
  );
  const ctx = canvas.getContext("2d");

  if (req.query) {
  }
});
