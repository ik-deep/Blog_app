const blogDataValidater = ({title,textBody}) =>{
    return new Promise((resolve,reject)=>{
        if(!title || !textBody){
            reject("Missing blog data");
        }
        if(typeof title !== 'string') reject("title is not a text");

        resolve()
    })
}

module.exports = {blogDataValidater};