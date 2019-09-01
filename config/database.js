if(process.env.NODE_ENV='production'){
    module.exports={mongoURL:'mongodb+srv://AK:a01129292532@@cluster0-cwwzz.mongodb.net/test?retryWrites=true'}
}else{
    module.exports={mongoURL:'mongodb://localhost/ToDo-dev'}
    
}