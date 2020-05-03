const request = require('request');
const ytdl = require('ytdl-core');
const getYouTubeID = require('get-youtube-id');



function getID(str, callback) {
  if (str.includes('youtube.com')) {
    callback(getYouTubeID(str));
  } else {
    search_video(str, (id) => {
      callback(id);
    });
  }
  }

function search_video(query, callback) {
  request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + "AIzaSyCqli72lmo5jpNCJ5M8qfFJZCoMgZlq_TU", (error, response, body) => {
    if (error) return message.reply('There was an error finding that song');
      try {
        const json = JSON.parse(body);
          callback(json.items[0].id.videoId);
            } catch (e) {
                callback(null);
                }
            });
        }

function playMusic(guild, message) {
  const voiceChannel = message.member.voiceChannel;

  voiceChannel.join().then(connection => {
  guild.skippers = [];
  const stream = ytdl.downloadFromInfo(guild.queue[0].info, {
    filter: 'audioonly'
  });
  message.channel.send(`Now playing: **${guild.queue[0].info.title}** as requested by ${guild.queue[0].requester.displayName}`);

  const dispatcher = connection.playStream(stream);
  dispatcher.on('error', console.log);
  dispatcher.on('debug', console.log);
  dispatcher.on('end', () => {
    guild.queue.shift();
    if (guild.queue.length === 0) {
      guild.isPlaying = false;
      setTimeout(() => {
        voiceChannel.leave();
        return message.channel.send('Queue is empty. Queue up some more tunes!');
      }, 2500);
    } else {
        setTimeout(() => {
          playMusic(guild, message);
        }, 500);
      }
  });
  });
  }

function skip_song(message) {
  message.guild.voiceConnection.dispatcher.end()
}

module.exports = {
  getID : getID,
  playMusic: playMusic,
  search_video: search_video,
  skip_song: skip_song
}
