import pool from '../services/db';

export default class Venue {
  constructor(
    public name: string,
    public spotify_id: string,
    private token: string,
    public ticket_default_no: number,
    public closing_times?: string,
    private id?: number
  ) {}

  public static async create (venue: Venue): Promise<Venue> {
    const result = await pool.query(`
      INSERT INTO venues (name, token, ticket_default_no, spotify_id)
      VALUES ('${venue.name}', '${venue.token}', ${venue.ticket_default_no}, '${venue.spotify_id}')
      RETURNING *;
    `);
    return result.rows[0];
  };

  public static async find (name: string): Promise<Venue>  {
    const result = await pool.query(`
      SELECT * FROM venues WHERE name = ${name};
    `);
    return result.rows[0];
  };

  public static async authorize (token:string): Promise<Venue>  {
    const result = await pool.query(`
      SELECT * FROM venues WHERE token = '${token}';
    `);
    return result.rows[0];
  };

  public static async updateToken (spotify_id: string, token:string): Promise<Venue>  {
    const result = await pool.query(`
      UPDATE venues
      SET token = '${token}'
      WHERE spotify_id = '${spotify_id}'
      RETURNING *;
    `);
    return result.rows[0];
  };
}