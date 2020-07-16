const express = require("express")

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get(
	'/login/github',
	(req, res) => {
		res.redirect('https://botletics-users.herokuapp.com/api/v1/auth/github')
	}
)

app.get(
	'/profile',
	(req, res) => {
		console.log("LOGGED IN")
		console.log(req.user)
	}
)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err)
})

// Error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: req.app.get('env') === 'development' ? err : {}
	})
})

const port = process.env.PORT || 10000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
