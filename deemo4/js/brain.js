var QTalbe = {} ;

var alpha = 0.8 ;

var gamma = 0.5 ;

var config = {
    "jump" : 1 ,
    "stay" : 0
};

var setQ = function( state , action , award ){
    var config = [ state.diffY, state.speedY, state.tubeX, action ];
    if (!(config in Q_table)) {
        Q_table[config] = 0;
    }
    Q_table[config] += award;
};


var getQ = function(state , action){
    var config = [ state.diffY, state.speedY, state.tubeX, action ];
    if (!(config in Q_table)) {
        return 0;
    };
    return Q_table[config];
};


var award = function(state , action , reward){
    var optimalFutureValue = Math.max(getQ(futureState, actionSet.STAY),
        getQ(futureState, actionSet.JUMP));
    var updateValue = alpha*(rewardForState + gamma * optimalFutureValue - getQ(state, action));

    setQ(state , action , updateValue) ;
};

var getAction = function(state) {
    var takeRandomDecision = Math.ceil(Math.random() * 100000)%90001;
    if (takeRandomDecision == 0) {
        var shouldJump = ((Math.random() * 100 )%4 == 0);
        if (shouldJump) {
            return config.jump ;
        } else {
            return config.stay ;
        }
    };
    var rewardForStay = getQ(state, config.stay);

    var rewardForJump = getQ(state, conf.jump);

    if (rewardForStay > rewardForJump) {
        return conf.stay;
    } else if (rewardForStay < rewardForJump) {
        return conf.jump;
    } else {
        var shouldJump = (Math.ceil( Math.random() * 100 )%25 == 0);
        if (shouldJump) {
            return conf.jump;
        } else {
            return config.stay;
        }
    };
};

var next = function(){
}