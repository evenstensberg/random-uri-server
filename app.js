const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const generate_base64 = async (url) => {
  const resp = await fetch(url)
  const blob = await resp.blob();
  const buffer = Buffer.from(await blob.arrayBuffer());
  const str = buffer.toString("base64");
  return str;
};
const get_timestamp = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

app.use(get_timestamp);

app.get("/random", async(request, response) => {
  response.json({
    image: `data:image/png;base64,${await generate_base64("https://picsum.photos/200/300")}`
  });
});

app.get("*", (request, response) => {
  response.status(404).json({ message: "Route not found", status: 404 });
});

app.post("*", (request, response) => {
  response.status(401).json({ message: "Unauthorized", status: 401 });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
