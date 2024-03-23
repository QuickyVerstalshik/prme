import nextSession from 'next-session';

const getSession = nextSession({ autoCommit: true });

export default async function handler(req, res) {
  const session = await getSession(req, res);
  if (req.method === 'POST') {
    session.user = req.body;
    return res.status(200).json(session.user);
  }
  if (req.method === 'DELETE') {
    await session.destroy();
    return res.status(200).json({});
  }
  res.status(200).json(session.user);
}
