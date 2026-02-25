import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoPlayer = () => {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    experimentalSvgIcons: true,
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },
    sources: [
      {
        src: "//vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
    ],
  };

  const VideoPlayer = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [playbackRate, setPlaybackRate] = useState(1);
    const { options, onReady } = props;

    useEffect(() => {
      if (!playerRef.current) {
        const videoElement = document.createElement("video-js");

        videoElement.classList.add("vjs-big-play-centered");
        videoRef.current.appendChild(videoElement);

        const player = (playerRef.current = videojs(
          videoElement,
          options,
          () => {
            videojs.log("player is ready");
            onReady && onReady(player);
          }
        ));
      } else {
        const player = playerRef.current;

        player.autoplay(options.autoplay);
        player.src(options.sources);
      }
    }, [options, videoRef]);

    useEffect(() => {
      if (playerRef.current) {
        playerRef.current.playbackRate(playbackRate);
      }
    }, [playbackRate]);

    useEffect(() => {
      const player = playerRef.current;

      return () => {
        if (player && !player.isDisposed()) {
          player.dispose();
          playerRef.current = null;
        }
      };
    }, [playerRef]);

    return (
      <>
        <div data-vjs-player>
          <div ref={videoRef} />
        </div>
        <div
          style={{
            marginTop: "20px",
          }}
        ></div>
      </>
    );
  };

  return (
    <div>
      <VideoPlayer
        options={videoJsOptions}
        onReady={() => console.log("The video is ready to play")}
      />
    </div>
  );
};

export default VideoPlayer;
