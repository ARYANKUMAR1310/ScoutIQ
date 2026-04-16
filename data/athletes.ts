import raw from "./athletes.json";

const getScore = (a: any) => {
  const s = a.stats || {};

  if (a.sport === "Football") {
    return Math.round(
      (s.Speed || 0) * 0.25 +
      (s.Stamina || 0) * 0.2 +
      (s.Passing || 0) * 0.2 +
      (s.Dribbling || 0) * 0.15 +
      (s.Shooting || 0) * 0.1 +
      (s.Vision || 0) * 0.1
    );
  }

  if (a.sport === "Basketball") {
    return Math.round(
      (s.Speed || 0) * 0.2 +
      (s.Shooting || 0) * 0.25 +
      (s.Passing || 0) * 0.15 +
      (s.Defense || 0) * 0.2 +
      (s.Rebounding || 0) * 0.1 +
      (s.IQ || 0) * 0.1
    );
  }

  return Math.round(
    (s.Speed || 0) * 0.35 +
    (s.Stamina || 0) * 0.25 +
    (s.Technique || 0) * 0.15 +
    (s.Explosiveness || 0) * 0.15 +
    (s.Consistency || 0) * 0.05 +
    (s.Recovery || 0) * 0.05
  );
};

const athletes = raw.map((a: any) => ({
  ...a,
  score: getScore(a),
}));

export default athletes;