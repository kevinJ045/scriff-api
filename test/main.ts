import Scriff from "../src";

console.clear();

Scriff.auth.login('mishy', 'pass', 'ssn9n14l1W1tb26Bf8429d6tQ5341MbMjsB759od96912391f20pb93xhdzB5478H99a94Iu7g21274pw1231xs207e249M5I237I3193U7Kx3Q239156pl01620nNo311bX32319TL1279c323422T121v5')
.then(item => {
	Scriff.auth.self(item.token!, true)
	.then(async item => {
		Scriff.user.setUser(item);

		const socket = Scriff.socket.connect();

		const file = Scriff.fs.file('mishy:main.js');


		// console.log(await file.read());

		console.log(await Scriff.fs.ls('mishy', {
			namesOnly: true
		}));

		// const remote = await Scriff.remote.create({
		// 	username: 'mishy',
		// 	sessionID: '69US0ze_A5M0U_2HAADJ',
		// 	secret: 's'
		// });

		// const ls = await remote.exec('ls', true);

		// console.log(ls);

		// socket.on('chat:new', (e) => console.log(e));

		// socket.emit('chat:new', {
		// 	recipient: 'su',
		// 	content: 'hi'
		// });

		// console.log();

		// console.log(Scriff.user.getUser().token);

	});
});