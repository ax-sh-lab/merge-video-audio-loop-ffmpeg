const fs = require("fs");
const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");

const ffmpeg = createFFmpeg();

async function ffmpegMergeAudioToVideo({ video, audio, output }) {
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "video.mp4", await fetchFile(video));
  ffmpeg.FS("writeFile", "audio.mp3", await fetchFile(audio));

  await ffmpeg.run(
    "-i",
    "video.mp4",
    "-stream_loop",
    "-1",
    "-i",
    "audio.mp3",

    "-map",
    "0:v",
    "-map",
    "1:a",
    "-c:v",
    "copy",
    "-shortest",
    "-y",
    "./output.mp4"
  );
  await fs.promises.writeFile(output, ffmpeg.FS("readFile", "output.mp4"));
  return output;
  //   process.exit(0);
}

// var args = [
//     '-i', video_ur,
//     '-stream_loop', '-1',
//     '-i', audio_ur,
//     '-map', '0:v',
//     '-map', '1:a',
//     '-c:v', 'copy',
//     '-shortest',
//     '.\\output7.mp4'
// ];

(async () => {
  const result = await ffmpegMergeAudioToVideo({ video, audio, output });
  console.log({ result });
})();
