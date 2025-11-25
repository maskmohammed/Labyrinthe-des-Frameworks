export const playSound = (name: string) => {
  const audio = new Audio(`/sounds/${name}.mp3`);
  audio.volume = 0.2;
  audio.play();
};
