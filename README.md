# Kotori
Stupid Discord API wrapper, that I made just because wanted to.   
# Usage
This is basic ping pong bot.   
Investigate the code to find out things you need.
```js
let { Client, API } = require("/path/to/kotori/dir")
let client = new Client("your token here")
client.on("messageCreate", (message) => {
  if (message.content == "Ping!") API.sendMessage(client, message.channel_id, "Pong!")
})
client.on("ready", () => {
  console.log("Logged in as " + client.user.username + "#" + client.user.discriminator)
})
```
