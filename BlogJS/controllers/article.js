const Article = require('mongoose').model('Article');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },

    createPost: (req, res) => {
        let articleBody = req.body;

        let errorMessage = "";

        if (!req.isAuthenticated()) {
            errorMessage = "You should be logged in to make articles!";
        } else if (!articleBody.title) {
            errorMessage = "Invalid title!";
        } else if (!articleBody.content) {
            errorMessage = "Invalid content!";
        }

        if (errorMessage) {
            res.render('article/create', {error: errorMessage});
            return;
        }

        articleBody.author = req.user.id;

        Article.create(articleBody).then(article => {
            req.user.articles.push(article.id);
            req.user.save(err => {
                if(err){
                    res.redirect('/', {error: err.message});
                }else {
                    res.redirect('/');
                }
            })
        });
    },

    details: (req, res) => {
        let id = req.user.id;

        Article.findById(id).populate('author').then(article =>{
            res.render('article/details', article)
        });
    }
};