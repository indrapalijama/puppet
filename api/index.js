// const qrcode = require("qrcode-terminal");
// const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
// const https = require("https");

// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

// client.initialize();

// client.on("qr", (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// client.on("authenticated", () => {
//   console.log("AUTHENTICATED");
// });

// client.on("ready", () => {
//   console.log("Client is ready!");
// });

// function GetMeme() {
//   return new Promise((resolve, reject) => {
//     const url = "https://meme-api.com/gimme";

//     https
//       .get(url, (response) => {
//         let data = "";

//         response.on("data", (chunk) => {
//           data += chunk;
//         });

//         response.on("end", () => {
//           try {
//             const memeData = JSON.parse(data);
//             if (memeData && memeData.url && memeData.title) {
//               resolve({
//                 title: memeData.title,
//                 url: memeData.url,
//               });
//             } else {
//               reject(new Error("Unable to fetch meme URL or title."));
//             }
//           } catch (error) {
//             reject(new Error("Failed to parse meme API response."));
//           }
//         });
//       })
//       .on("error", (error) => {
//         reject(new Error(error.message));
//       });
//   });
// }

// client.on("message", async (message) => {
//   if (message.body === "meme") {
//     try {
//       const { title, url } = await GetMeme();
//       const media = await MessageMedia.fromUrl(url);
//       // Replying with media and caption
//       client.sendMessage(message.from, media, {
//         caption: title,
//       });
//     } catch (error) {
//       message.reply(error);
//     }
//   }
//   if (message.body === "ping") {
//     message.reply("pong");
//   }
// });

module.exports = (req, res) => {
  // const name = req.query.name || "stranger";
  // res.status(200).send(`Hello, ${name}!`);
  const qrcode = require("qrcode-terminal");
  const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
  const https = require("https");
  const client = new Client({
    authStrategy: new LocalAuth(),
  });
  client.initialize();
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });
  client.on("authenticated", () => {
    console.log("AUTHENTICATED");
  });
  client.on("ready", () => {
    console.log("Client is ready!");
    res.status(200).send(`reeady`);
  });
  function GetMeme() {
    return new Promise((resolve, reject) => {
      const url = "https://meme-api.com/gimme";
      https
        .get(url, (response) => {
          let data = "";
          response.on("data", (chunk) => {
            data += chunk;
          });
          response.on("end", () => {
            try {
              const memeData = JSON.parse(data);
              if (memeData && memeData.url && memeData.title) {
                resolve({
                  title: memeData.title,
                  url: memeData.url,
                });
              } else {
                reject(new Error("Unable to fetch meme URL or title."));
              }
            } catch (error) {
              reject(new Error("Failed to parse meme API response."));
            }
          });
        })
        .on("error", (error) => {
          reject(new Error(error.message));
        });
    });
  }
  client.on("message", async (message) => {
    if (message.body === "meme") {
      try {
        const { title, url } = await GetMeme();
        const media = await MessageMedia.fromUrl(url);
        // Replying with media and caption
        client.sendMessage(message.from, media, {
          caption: title,
        });
      } catch (error) {
        message.reply(error);
      }
    }
    if (message.body === "ping") {
      message.reply("pong");
    }
  });
};
