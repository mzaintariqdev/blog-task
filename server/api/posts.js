import { defineEventHandler } from 'h3'; 
import posts from '@/data/posts.json'; 

export default defineEventHandler(() => {
  return posts;
});
