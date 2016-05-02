 
function queryQuestionary() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/queryQuestionary/queryQuestionary.html',
        controller: QueryQuestionaryController,
        controllerAs: "queryQuestionaryCtrl"
    };
}


class QueryQuestionaryController{

    constructor(moment) {
        let self = this;
		self.queryInfo = {
			city: "",
			region: "",
			category: "",
			from: new Date(),
			to: new Date()
		}
    }
}

export default queryQuestionary;
