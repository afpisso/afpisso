export default function handler(req, res) {
  const key = process.env.ANTHROPIC_API_KEY;
  const allKeys = Object.keys(process.env);
  res.status(200).json({
    hasKey: !!key,
    keyLength: key ? key.length : 0,
    keyPreview: key ? key.slice(0, 14) + '...' : null,
    nodeEnv: process.env.NODE_ENV,
    totalEnvVars: allKeys.length,
    // show any key that looks related — names only, no values
    similarKeys: allKeys.filter(k => k.toUpperCase().includes('ANTHROPIC') || k.toUpperCase().includes('API_KEY') || k.toUpperCase().includes('CLAUDE')),
  });
}
