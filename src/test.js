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
  if (!message.content.startsWith("k!")) return;
  let args = message.content.slice(2).trim().split(/ +/)
  let commandName = args.shift().toLowerCase()
  if (commandName == "message") {
    if (message.author.id != "925569913949683763") return;
    client.api.sendMessage(message.channel_id, JSON.parse(args.join(" ")))
  }
})
client.on("interactionCreate", async (interaction) => {
  await client.api.defer(interaction.id, interaction.token)
  if (interaction.data.custom_id == "click_one") client.api.followUp(interaction.token, "Clicked!")
})
