const fs = require("fs");

const connectWebSocket = (io) => {
	let count = 0;

	io.on('connection', function (socket) {
		socket.on('join', (userId) => {
			socket.join(userId);
			console.log("New user joined!");
		});

		const imgBinary = fs.readFileSync("./public/image.png");  // character
		const loadingBinary = fs.readFileSync("./public/loading.gif");  // loading

		socket.on('new-msg', async function (data) {
			if (count > 2) {
				count = count - 3;
			}

			if (data.msg.includes('opera story')) {
				io.to(data.room).emit('send-msg-response', "Sure, writing stroy now...(this can take 10 seconds)");

				setTimeout(() => {
					io.to(data.room).emit('loading', loadingBinary);
				}, 2000);

				setTimeout(() => {
					write_story_timer = false;
					io.to(data.room).emit('send-msg-response', "Space immigration is a dangerous journey, and the Raspodia's crew was more than...");
				}, 10000);
			} else if (data.msg.includes('create portrait')) {
				io.to(data.room).emit('send-msg-response', "Sure, creating character now...(this can take 10 seconds)");

				setTimeout(() => {
					io.to(data.room).emit('loading', loadingBinary);
				}, 2000);

				setTimeout(() => {
					io.to(data.room).emit('img', imgBinary);
				}, 10000);
			} else if (count == 0) {
				io.to(data.room).emit('send-msg-response', "Nice to meet you");
			} else if (count == 1) {
				io.to(data.room).emit('send-msg-response', "Sure");
			} else if (count == 2) {
				io.to(data.room).emit('send-msg-response', 'Got it');
			}

			count++;
		})
	});
}

module.exports = {
	connectWebSocket,
}
