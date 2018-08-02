class Participant {
	constructor(params) {
		this.name = params.name;
		this.score = 0;
	}
}

class GameRoom {
	constructor() {
		this.isActive = false;
		this.participants = [];
	}

	addParticipant(p) {
		this.participants.push(p);
	}
}

var p1 = new Participant({ name: "Rohan" });
var p2 = new Participant({ name: "Monica" });
var g = new GameRoom();
g.addParticipant(p1);
g.addParticipant(p2);
console.log(g);
