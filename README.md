# Kotori
Stupid Discord API wrapper, which I made just because I wanted to.   
**Warning: this version is INCOMPATIBLE with older versions**  
Keep in mind, that library is in the rewrition stage, meaning that it may break over time.
# Usage
This is basic ping pong bot.   
You can run it with `TOKEN="your token here" node fileName.js`
```js
const Client = require("/path/to/kotori") // or @keneshin/kotori if you downloaded it as package from github
let client = new Client(process.env.TOKEN || process.argv[2])
client.on("message", (message) => {
  if (message.content == "ping!") client.api.sendMessage(message.channel_id, "Pong!")
})
```
Keep in mind that this is only basic example, you can find the documentation on DOCSURL  
^^ this will be replaced when i'll remake docs for the new version of lib
