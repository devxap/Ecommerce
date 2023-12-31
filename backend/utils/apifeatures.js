class ApiFeatures {

    constructor(mongoQuery,SearchParams){
        this.mongoQuery=mongoQuery;
        this.SearchParams=SearchParams;
    }

    search(){
        const keyword = this.SearchParams.keyword
        ?   {
            name:{
                $regex: new RegExp(this.SearchParams.keyword),
                $options:"i",
                },
            } 
        : {};        

        this.mongoQuery=this.mongoQuery.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy={...this.SearchParams};
        //Removing some fields for category
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=>delete queryCopy[key]);
        
        //Filter for price and rating
        console.log(queryCopy);
        let SearchParams=JSON.stringify(queryCopy);
        SearchParams=SearchParams.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        this.mongoQuery=this.mongoQuery.find(JSON.parse(SearchParams));
        console.log(SearchParams);
        return this;
    }

    pagination(resultPerPage){
        const currentPage=Number(this.SearchParams.page) || 1;
        const skip=resultPerPage * (currentPage - 1);
        this.mongoQuery=this.mongoQuery.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;