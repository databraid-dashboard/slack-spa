// @flow

export default function convertScoreToColorAndEmoji(score: mixed) {
  const currentScore = parseFloat(score);

  if (currentScore < -0.4) {
    return { color: 'slack-red', emoji: 'frustrated' };
  }
  if (currentScore >= -0.4 && currentScore < -0.02) {
    return { color: 'slack-yellow', emoji: 'sad' };
  }
  if (currentScore >= -0.02 && currentScore < 0.02) {
    return { color: 'slack-grey', emoji: 'neutral' };
  }
  if (currentScore >= 0.02 && currentScore < 0.4) {
    return { color: 'slack-green', emoji: 'smile' };
  }
  if (currentScore >= 0.4) {
    return { color: 'slack-blue', emoji: 'happy' };
  }
  return { color: 'slack-white', emoji: 'neutral' };
}
