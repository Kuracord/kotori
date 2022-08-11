module.exports = {
  t: "INTERACTION_CREATE",
  async execute(client, { data }) {
    client.emit("interactionCreate", data)
  }
}
