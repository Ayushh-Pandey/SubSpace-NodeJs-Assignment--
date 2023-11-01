import express from 'express';
const router = express.Router();
import { blogStats,blogSearch,getbyID } from '../controllers/data-retrieval-controller.js';

// this get route fetches the data and returns the Analysed data in response
router.get('/blog-stats',blogStats)


// this get route searches for query string and returns the array of object having query string
router.get('/blog-search',blogSearch);

//this get route searches for blog with specific id and returns the json object of blog
router.get('/blog-search/:id',getbyID);

export default router;
