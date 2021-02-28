// Load up the discord.js library
const path = require("path");
const {
  CommandoClient,
  SQLiteProvider
} = require("discord.js-commando");
const sqlite = require("sqlite");
const tok = require("./helpers/commandless/tok");
const {
  GatewayServer,
  SlashCreator
} = require('slash-create');

// Here we load the config.json file that contains our token and our prefix values.

// config.token contains the bot's token
// config.prefix contains the message prefix.
const config = require("./config.json");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new CommandoClient({
  commandPrefix: config.prefix,
  owner: "130873563317010433",
  invite: "https://discord.com/oauth2/authorize?client_id=339515606363537409&scope=bot&permissions=36818240",
});

//setting up slash command handler
const creator = new SlashCreator({
  applicationID: config.clientID,
  publicKey: config.publicKey,
  token: config.token
});

//registering slash commands
creator.withServer(new GatewayServer(
    (handler) => client.ws.on('INTERACTION_CREATE', handler)
  ))
  .registerCommandsIn(path.join(__dirname, "slashCommands"))
  .syncCommands();

sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
  client.setProvider(new SQLiteProvider(db));
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["simple", "Simple"],
    ["gifs", "Gifs"],
    ["voice", "Voice"],
    ["talk", "Talk"],
    ["holiday", "Holiday"],
    ["testcommands", "TestCommands"],
    ["video", "Video"],
    ["games", "Games"],
    ["funny", "Funny"],
    ["music", "Music"],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commandoCommands"));

const mongoose = require("mongoose");

mongoose.connect(config.mongoDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("db connected: " + db.name);
});

//TODO: do something with the activity that shows on the bot
client.once("ready", async () => {

  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);

  // var suckysometitty = "i want your ass";
  //setupInteractions(client);

  // client.api.applications(client.user.id).commands.post({
  //   data: {
  //     name: "stuff",
  //     description: "more stuffers",
  //   },
  // });

  // console.log(await client.api.applications(client.user.id).commands.get());

  client.user.setActivity(`Serving ${client.guilds.cache.size} juicy servers`);
});

client.on("error", console.error);

client.on("guildCreate", (guild) => {
  // This event triggers when the bot joins a guild.
  //TODO: add Guild to DB
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  client.user.setActivity(`Serving ${client.guilds.cache.size} juicy servers`);
});

client.on("guildDelete", (guild) => {
  // this event triggers when the bot is removed from a guild.
  // TODO: Delete guild from DB
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} juicy servers`);
});

client.on("disconnect", (event) => {
  console.log(event);
  client.login(config.token);
});

if (config.tokEnabled) {
  client.on("message", async (message) => {
    tok(message, client);
  });
}

global.currentTeamMembers = [];
global.queue = new Map();
global.servers = {};

// bot.on("message", async message => {
//   // This event will run on every single message received, from any channel or DM.

//   // It's good practice to ignore other bots. This also makes your bot ignore itself
//   // and not get into a spam loop (we call that "botception").
//   if(message.author.bot) return;

//   // Also good practice to ignore any message that does not start with our prefix,
//   // which is set in the configuration file.
//   if(message.content.indexOf(config.prefix) !== 0) return;

//   // Here we separate our "command" name, and our "arguments" for the command.
//   // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
//   // command = say
//   // args = ["Is", "this", "the", "real", "life?"]
//   const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
//   const command = args.shift().toLowerCase();
//   });

client.login(config.token);