const path = require("path");
const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/api/domains/:organizationId", async (req, res) => {
  const { organizationId } = req.params;
  const url = `https://odata.domain.fi/v4/odata/domains?$filter=OrganizationId%20eq%20%27${organizationId}%27&$orderby=GrantDate%20desc`;
  const { value: domains } = await fetch(url)
    .then(r => r.json())
    .then(d => (console.log(d), d))
    .catch(err => console.error(err));

  console.log({ organizationId, domains, url });
  return res.json(domains);
});

app.use(express.static(path.join(__dirname, "frontend")));

app.listen(8080, () => {
  console.log("ready");
});
