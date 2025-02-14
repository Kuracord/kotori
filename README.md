# Kotori
Stupid Kuracord API wrapper, which I made just because I wanted to.   
**Warning: this version is INCOMPATIBLE with older versions**  
Keep in mind that this library is being rewritten, meaning that it may break over time.
# Usage
This is basic ping pong bot.   
You can run it with `TOKEN="your token here" node fileName.js`
```js
const { Client } = require("/path/to/kotori") // or @kuracord/kotori if you downloaded it as package from github
let client = new Client(process.env.TOKEN || process.argv[2])
client.on("message", (message) => {
  if (message.content == "ping!") client.api.sendMessage(message.channelId, "Pong!")
})
```
This is only a basic example, the documentation is kind of in development though, so just inspect the code