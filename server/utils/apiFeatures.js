const search = async (resultsArray, query) => {
    //filter results part
    let queryCopy = { ...query };
    const keyword = ['search', 'page', 'limit'];
    keyword.forEach(elem => delete queryCopy[elem]);
    queryCopy = JSON.stringify(queryCopy);
    queryCopy = queryCopy.replace(/gte|gt|lte|lt/g, key => `$${key}`);
    queryCopy = JSON.parse(queryCopy);
    // console.log(queryCopy);


    //search results part
    const search = query.search ? {
        name: { "$regex": query.search, "$options": "i" },
        ...queryCopy
    } : { ...queryCopy };

    //pagination part
    const  currPage = query.page || 1;
    const itemsPerPage = query.limit || 5;
    const skip = (currPage-1)*itemsPerPage;
    // console.log(search);
    return await resultsArray.find({ ...search }).skip(skip).limit(itemsPerPage);
}

module.exports = { search };