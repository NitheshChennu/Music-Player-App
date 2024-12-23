// List of reliable audio sources for fallback
const FALLBACK_AUDIO_SOURCES = [
  'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav',
  'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav',
  'https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
];

export const validateAudioUrl = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) return url;
    
    // Try fallback sources until we find one that works
    for (const fallbackUrl of FALLBACK_AUDIO_SOURCES) {
      const fallbackResponse = await fetch(fallbackUrl, { method: 'HEAD' });
      if (fallbackResponse.ok) return fallbackUrl;
    }
    
    throw new Error('No valid audio source found');
  } catch (error) {
    console.warn(`Audio source ${url} not available, using last fallback`);
    return FALLBACK_AUDIO_SOURCES[FALLBACK_AUDIO_SOURCES.length - 1];
  }
};