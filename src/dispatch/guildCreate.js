module.exports = {
  t: "GUILD_CREATE",
  execute(client, { data }) {
    let guildIndex = client.guilds.findIndex(a=>a.id==data.id)
    if (guildIndex) client.guilds[guildIndex] = data
    else client.guilds.push(data)
  }
}
