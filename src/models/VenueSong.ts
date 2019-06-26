import pool from '../config/db';

export default class VenueSong {
  constructor(
    public song: string,
    public userEmail: string,
    public venueName: string,
    public diamonds: number,
    public submission: string,
    public currentlyPlaying: boolean,
    public lockedIn: boolean,
    private id?: number
  ) {}

  // Need to remove user's ticket.
  public static async create (spotifySong: string, userEmail: string, venueName: string): Promise<VenueSong> {
    const result = await pool.query(`
      INSERT INTO venue_songs (song, user_id, venue_id, diamonds, submission_time)
      VALUES ('${spotifySong}', '${userEmail}', '${venueName}', 0, '${String(new Date(Date.now()))}')
      RETURNING *;
    `);
    return result.rows[0];
  };

  // Need to remove user's diamonds.
  public static async promote (venueSong: VenueSong): Promise<VenueSong>  {
    const result = await pool.query(`
      UPDATE venue_songs
      SET diamonds = 5
      WHERE song = '${venueSong.song}'
      RETURNING *;
    `);
    return result.rows[0];
  };

  public static async getAll (venueName: string): Promise<Array<VenueSong>>  {
    const result = await pool.query(`
      SELECT * FROM venue_songs WHERE venue_id = '${venueName}';
    `);
    return result.rows;
  };
}