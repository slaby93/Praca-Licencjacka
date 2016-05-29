/**
 * Created by danielslaby on 14/03/16.
 */

function commentsModal() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/commentsModal/commentsModal.html',
        controller: CommentsModalController,
        controllerAs: "commentsModalCtrl"
    };
}

class CommentsModalController {
    constructor($log, loader, EventService, $scope) {
        let self = this;
        self.$l = $log;
        self.loader = loader;
        self.$scope = $scope;
        self.EventService = EventService;
        self.commentInfo = {};
        self.watchEventInfo();
        self.setTopScopeListeners();
    }


    watchEventInfo() {
        let self = this;
        self.$scope.$watch(()=> {
            return self.commentInfo;
        }, (newValue)=> {

        }, true);
        self.$scope.$watch(()=> {
            return self.errorClass;
        }, (newValue)=> {

        }, true);
    }

    setTopScopeListeners() {
        let self = this;
        self.$scope.$on('commentsModal:show', (event, data) => {
            self.commentInfo = data;  self.errorClass = "hidden";
            self.commentInfo.content = '';
            $('#grade-dropdown')
                .dropdown({

                    onChange(value, text, $choice){
                        self.commentInfo.grade = value;
                    }
                });
            $('#comments-modal')
                .modal({
                    onApprove : () => {
                        if(self.commentInfo.grade == undefined || self.commentInfo.content.length < 30 || self.commentInfo.content.length > 500){
                            self.errorClass = "visible";
                            self.$scope.$evalAsync();
                            return false;
                        }else{
                            //here we should send a request to add a comment, in case of a positive outcome, we should
                            // use self.UserService.setComments();
                            //in case of a failure, we should show a message saying that the user failed in his life
                            self.$scope.$emit("commentsModal:hide", {"status" : "success"});
                            $('#comments-modal')
                                .modal('hide')
                            ;
                        }
                    },
                    onDeny : () => {
                        self.$scope.$emit("commentsModal:hide", {"status" : "failure"});
                        $('#comments-modal')
                            .modal('hide')
                        ;
                    }
                })
                .modal('setting', 'closable', false)
                .modal('setting', 'allowMultiple', false)
                .modal('show')
            ;
        });

    }


}
export default commentsModal;