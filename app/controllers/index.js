var Movie = require('../models/movie')
var Category = require('../models/category')

// index page
exports.index = function (req, res) {
    console.log('user in session')
    console.log(req.session.user)
    Category
        .find({})
        .populate({
            path: 'movies',
            options: {
                limit: 5
            }
        })
        .exec(function (err, categories) {
            if (err) {
                console.log(err)
            }
            res.render('index', {
                title: 'immoc 首页',
                categories: categories
            })
        })
}

// search page
exports.search = function (req, res) {
    var catId = req.query.cat
    var page = parseInt(req.query.p)
    var count = 2
    var index = page * count
    Category
        .find({_id: catId})
        .populate({
            path: 'movies',
            select: 'title poster'
            // options: {     // mongosse的skip有问题
            //     limit: 2,
            //     skip:index
            // }
        })
        .exec(function (err, categories) {
            if (err) {
                console.log(err)
            }
            var category = categories[0] || {}
            var movies = category.movies || []
            var results = movies.slice(index, index + count)

            res.render('results', {
                title: 'immoc 结果列表页面',
                keyword: category.name,
                currentPage: (page + 1),
                query: 'cat=' + catId,
                totalPage: Math.ceil(movies.length/count),
                movies: results
            })
        })
}