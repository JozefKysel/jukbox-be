export interface User {
  _id?: string
  token?: string
  email: string
  name: string
  diamonds: number
}

export interface UserVenue {
  id?: string
  tickets: number
  diamonds: number
}

export interface Venue {
  id?: string
  token?: string
  ticket_default_no: number
  closing_times: ClosingTimes
}

export interface ClosingTimes {
  Monday: string
  Tuesday: string
  Wednesday: string
  Thursday: string
  Friday: string
  Saturday: string
  Sunday: string
}

export interface GoogleCredentials {
  client_id: string,
  client_secret: string,
  redirect_uri: string
};

export interface Token {
  access_token: string
};
