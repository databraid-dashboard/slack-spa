// @flow

export default function convertScoreToColorAndEmoji(score: mixed) {
  const currentScore = parseFloat(score);

  if (currentScore < -0.4) {
    return { color: 'red', emoji: 'frustrated' };
  }
  if (currentScore >= -0.4 && currentScore < -0.02) {
    return { color: 'yellow', emoji: 'sad' };
  }
  if (currentScore >= -0.02 && currentScore < 0.02) {
    return { color: 'grey', emoji: 'neutral' };
  }
  if (currentScore >= 0.02 && currentScore < 0.4) {
    return { color: 'green', emoji: 'smile' };
  }
  if (currentScore >= 0.4) {
    return { color: 'blue', emoji: 'happy' };
  }
  return { color: 'white', emoji: 'neutral' };
}
