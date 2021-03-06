var QTable = function () {
	this.table = {};
};

QTable.prototype.getQ = function (state, action) {
	var config = [state.diffY, state.diffX, action];

	if (!(config in this.table)) {
		return 0;
	}
	;

	return this.table[config];
};

QTable.prototype.setQ = function (state, action, award) {
	var config = [state.diffY, state.diffX, action];

	if (!(config in this.table)) {
		this.table[config] = 0;
	}
	;

	this.table[config] += award;
};

var QL = function (config, alpha, gamma) {
	this.config = config;
	this.alpha = alpha;
	this.gamma = gamma;
	this.table = new QTable();
	this.lastAction = null ;
	this.episode = 0;
};

QL.prototype.getAction = function (state) {
	var takeRandomDecision = Math.ceil(Math.random() * 100000) % 90001;

	if (takeRandomDecision === 0) {
		return ((Math.random() * 100) % 4 == 0)
			? this.config.jump : this.config.stay
	}
	;

	var awardForStay = this.table.getQ(state, this.config.stay);

	var awardForJump = this.table.getQ(state, this.config.jump);

	if (awardForStay > awardForJump) {
		return this.config.stay
	} else if (awardForStay < awardForJump) {
		return this.config.jump;
	} else {
		var shouldJump = (Math.ceil(Math.random() * 100) % 25 == 0);
		if (shouldJump) {
			return this.config.jump;
		} else {
			return this.config.stay;
		}
	};
};

QL.prototype.award = function (state, nextState, award, action) {
	var config_next = [nextState.diffY, nextState.diffX];

	var backward = (1 - this.alpha) * this.table.getQ(state, action);

	var _forward = this.alpha * (award + this.gamma * Math.max(this.table.getQ(config_next, this.config.jump), this.table.getQ(config_next, this.config.stay)));

	var update = backward + _forward;

	this.table.setQ(state, action, update);

	this.lastAction = {
		state : state ,
		action : action
	};
};

QL.prototype.next = function (state, nextState, award) {
	var action = this.getAction(state);
	return action ;
};
