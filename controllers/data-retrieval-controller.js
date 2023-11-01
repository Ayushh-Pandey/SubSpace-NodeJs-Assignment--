import _ from 'lodash'
import createError from '../utils/errorCreate.js';
import { fetchData } from '../middlewares/fetchMiddleware.js';

// create a memoized version of data fetching, using lodash memoization function for with caching period of 5 minutes
const memoizedDataFetch = _.memoize(fetchData, (str) => str, 30000);//30000 millisecond is equal to 5 min.

// create a function for data Analytics
const dataAnalysis = async (req, res, next) => {

    try {
        const dataArray = await memoizedDataFetch('analytics');//cache key is analytics

        //lodash size function returns the size of array
        const numberOfBlogs = _.size(dataArray);
        
        //sorting the dataArray in descending order by the title length then at 0th index longest title object will be present
        const longestTitle = [...dataArray].sort((x, y) => (y.title.length - x.title.length))[0].title;

        let blogsWithPrivacyTitle = 0;

        //lodash forEach function iterates over the collection and performs the function
        _.forEach(dataArray, function (value) {
            //lodash words function finds the value in the string
            if ((_.words(value.title, "Privacy")[0]) === "Privacy") {
                blogsWithPrivacyTitle++;
            }
        });
        
        //lodash uniq fucntion to get the array with unique blog titles
        let ans = _.uniqBy(dataArray, (obj) => obj.title);

        //response json object
        let result = {
            'Total number of blogs': numberOfBlogs,

            'The title of the longest blog': longestTitle,

            'Number of blogs with "privacy" in the title': blogsWithPrivacyTitle,

            'An array of unique blog titles': ans

        };

        res.status(200).json(result);

    } catch (error) {
        next(error); // error handling function
    }
};

//create a memoized version of data Analytics, using lodash memoization function for with caching period of 5 minutes
const memoizedDataAnalysis = _.memoize(dataAnalysis, (str) => str, 30000);

export const blogStats = memoizedDataAnalysis;

//create a function of data search query string
const searchData = async (req, res, next) => {

    try {
        const dataArray = await memoizedDataFetch('search');//cache key is search

        let str = req.query.query; //taking query string from request by user
        if (!str) {
            return next(createError(500, "input query is missing"));
        }

        let searchResult = dataArray.filter(findQuery);

        function findQuery(value) {
            let searchIn = _.lowerCase(`${value.title}`);
            let toSearch = _.lowerCase(`${str}`);
            let found = searchIn.search(`${toSearch}`);
            if (found === -1)
                return false;
            return true;
        }

        res.status(200).json(searchResult);

    } catch (error) {
        next(error); // error handling function
    }
};

//create a memoized version of data search query, using lodash memoization function for with caching period of 5 minutes
const memoizedSearchData = _.memoize(searchData, (str) => str, 30000);

export const blogSearch = memoizedSearchData;

const getByid = async(req,res,next)=>{
    try {
        const dataArray = await memoizedDataFetch('search');
        const Id = req.params.id;
        const Blog = _.find(dataArray,function(obj){
            if(obj.id===Id){
                return true;
            }
        })
        console.log(Blog);
        console.log(req.params.id);
        if(!Blog){
            res.status(404).json({message:'blog does not exist with this Id'});
        }
        res.status(200).json({'Blog with given id is':Blog});
    } catch (error) {
        next(error);
    }
};

export const getbyID = _.memoize(getByid,(str)=>str,30000);