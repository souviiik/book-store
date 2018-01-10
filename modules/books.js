/**
* books.js
*/

module.exports = function(app, BooksHostConnect){
    BooksHostConnect.connect('mongodb://localhost:27017/books', function(err, db){
        app.get('/book', function(req, res){
            db.collection('books').find().toArray(function(err, books){
                if(err){
                    console.log(err);
                } else {
                    res.json(books);
                }
            })
        });

        app.post('/book', function(req, res){
            db.collection('books').insertOne(req.body, function(err, books){
                if(err) {
                    console.log(err);
                } else {
                    res.status(201).send('Book with ISBN ' + req.body.isbn + ' successfully added');
                }
            })
        });
        
        app.get('/book/:ISBN', function(req, res){
            var isbn = parseInt(req.params.ISBN);
            db.collection('books').findOne({ 'isbn' : isbn }, function(err, books){
                if(err){
                    console.log(err);
                } else {
                    res.json(books);
                }
            });
        });
        
        app.delete('/book/:ISBN', function(req, res){
            var isbn = parseInt(req.params.ISBN);
            db.collection('books').findOneAndDelete({ 'isbn' : isbn }, function(err, books){
                if(err){
                    console.log(err);
                } else {
                    if(books.value !== null) {
                        res.json('Book with isbn ' + books.value.isbn + ' successfully removed');
                    } else {
                        res.status(400).send('Book with this isbn ' + books.value.isbn + ' not available');
                    }
                }
            });
        });

        app.put('/book/:ISBN', function(req, res){
            var isbn = parseInt(req.params.ISBN);
            
            db.collection('books').findOneAndUpdate({ 'isbn' : isbn },
                {$set: {
                    price: req.body.price,
                    publishedDate: req.body.publishedDate,
                    publisher: req.body.publisher,
                    title: req.body.title,
                    authors: req.body.authors
                }},
                function(err, books){
                    err && console.log(err) || (books.value!== null && res.json('successfully updated') || res.status(400).send('not available'));
                }
            );
        });
    });
}
