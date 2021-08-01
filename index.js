const express = require('express')
const app = express()
const port = 6080


// const dgraph = require("dgraph-js-http");
// const clientStub = new dgraph.DgraphClientStub(
//     "https://withered-frost.ap-south-1.aws.cloud.dgraph.io",
//     false
//   );
  
  const dgraph = require("dgraph-js");
  // const clientStub = dgraph.clientStubFromCloudEndpoint(
  //     "https://withered-frost.ap-south-1.aws.cloud.dgraph.io/graphql",
  //     "ODlkYTgyYTVjNDg2ZjkxODllY2UwOWY0ZjIzYTBlZDY="
  //     // "server89.amtex.co:8080"
  //   );

  const clientStub = new dgraph.DgraphClientStub(
    "localhost:9080"
  );
    
const dgraphClient = new dgraph.DgraphClient(clientStub);
// dgraphClient.setCloudApiKey("ODlkYTgyYTVjNDg2ZjkxODllY2UwOWY0ZjIzYTBlZDY=");

app.get('/',async (req, res, next) => {
  console.log('sent')
  const query = `query getLanguage($name: string) {
    getLanguage(func: eq(Language.engText, $name)) {
        uid,
        engText: Language.engText,
        text: Language.text,
        category: Language.category,
        index: Language.index,
        code: Language.code,
        createdAt: Language.createdAt,
        updatedAt: Language.updatedAt  
    }
}`;
const vars = { $name: 'English' };
const resp = await dgraphClient.newTxn().queryWithVars(query, vars);
res.send(resp.getJson())
})

app.use((err, req, res, next) => {
  console.log(err, 'err');
  return res.json({error: 'errored'})
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})