const Client = require("./client.js")
let client = new Client(process.env.TOKEN || process.argv[2])
/*client.on("debug", (msg) => {
 if (msg.includes('"op":0')) return
 console.log(msg)
})*/
client.on("ready", (data) => {
  console.log(`Kotori logged in successfully as user ${data.user.username}#${data.user.discriminator} with ID ${data.user.id}`)
//  console.log(data)
})
client.on("message", async (message) => {
  if (message.content.toLowerCase() == "hello kotori!") {
    let time = process.hrtime()
    await client.api.sendMessage(message.channel_id, "Say goodbye")
    time = process.hrtime(time)
    await client.api.sendMessage(message.channel_id, `Gayxios took ${time[0]} seconds (${time[1]} ns) to send message`)
  }
})
