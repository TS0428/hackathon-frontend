import axios from 'axios';

export type Reply = {
  id: number;
  content: string;
};

export type Cast = {
  id: number;
  user_id: number;
  content: string;
  likes: number;
  replies: Reply[];
};

export const fetchCasts = async (): Promise<Cast[]> => {
  const response = await axios.get('http://localhost:8080/casts');
  return response.data.map((cast: any) => ({
    ...cast,
    replies: JSON.parse(cast.replies)
  }));
};
