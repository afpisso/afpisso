export default function handler(req, res) {
  const key = process.env.ANTHROPIC_API_KEY;
  res.status(200).json({
    hasKey: !!key,
    keyLength: key ? key.length : 0,
    keyPreview: key ? key.slice(0, 14) + '...' : null,
    nodeEnv: process.env.NODE_ENV,
    totalEnvVars: Object.keys(process.env).length,
  });
}
