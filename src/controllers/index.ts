import { tokens } from '../services/google';
import { searchSpotify } from '../services/api-client';

export const redirectBack = (req: any, res: any) => {
  try {
    // 'http://localhost:3000/authorized-user?access_token=TOKEN'
    res.redirect(`http://localhost:3000/login?token=${tokens.access_token}`);
  } catch(e) {
    res.status(500).end();
  }
};

export const getUserInfo = (req: any, res: any) => {
  try {
    // should be 200 not 201 as it is in docs
    req.user && res.status(200).json(req.user);
    res.status(403).end();
  } catch(e) {
    res.status(500).end();
  }
}

export const searchForSongs = async (req: any, res: any) => {
  try {
    const songName: string = req.query.q;
    const token: string = req.token;
    const response = await searchSpotify(token, songName);
    response && res.status(200).json(response);
  } catch(e) {
    console.log(e);
    res.status(500).end();
  }
}
