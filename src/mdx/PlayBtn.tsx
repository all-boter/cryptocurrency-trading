'use client'

import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  path: string
  alt: string;
  isFullPath?: boolean
}

const consonantsAudioBaseUrl = '/consonantsAudio'

const PlayBtn: React.FC<Props> = ({ path, alt, isFullPath = false }) => {

  const debouncedPlayVoice = useDebouncedCallback(
    (key: string) => {
      try {
        const audioPath = isFullPath ? path : `${consonantsAudioBaseUrl}/${key}.mp3`;
        const audio = new Audio(audioPath);
        audio.play().catch((error) => {
          console.error(`Failed to play sound: ${error}`);
        });
      } catch (error) {
        console.error('play error', error);
      }
    },
    300,
  );

  return <button onClick={() => debouncedPlayVoice(path)}>
    {alt}
  </button>
};

export default PlayBtn;