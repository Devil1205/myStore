const search = async (resultsArray, query) => {
    //filter results part
    let queryCopy = { ...query };
    const keyword = ['search', 'page', 'limit', 'category'];
    keyword.forEach(elem => delete queryCopy[elem]);
    queryCopy = JSON.stringify(queryCopy);
    queryCopy = queryCopy.replace(/gte|gt|lte|lt/g, key => `$${key}`);
    queryCopy = JSON.parse(queryCopy);
    // console.log(queryCopy);


    //search results part
    let search = query.search ? {
        name: { "$regex": query.search, "$options": "i" },
        ...queryCopy
    } : { ...queryCopy };

    search = query.category ? {
        category: query.category,
        ...search
    } : { ...search }

    //pagination part
    const currPage = query.page || 1;
    const itemsPerPage = query.limit || 5;
    const skip = (currPage - 1) * itemsPerPage;
    // console.log(search);
    const product = await resultsArray.find({ ...search }).skip(skip).limit(itemsPerPage);
    const filteredProductCount = await resultsArray.countDocuments({ ...search });
    return {product,filteredProductCount};
}

module.exports = { search };