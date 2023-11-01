// created a function for creating a error

const createError = (status,message)=>{
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
};

export default createError;