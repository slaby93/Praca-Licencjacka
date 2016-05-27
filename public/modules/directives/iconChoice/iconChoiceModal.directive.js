/**
 * Created by danielslaby on 14/03/16.
 */

function iconChoiceModal() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/iconChoice/iconChoiceModal.html',
        controller: IconChoiceModalController,
        controllerAs: "iconChoiceModalCtrl"
    };
}

class IconChoiceModalController {
    constructor($log, $mdDialog, loader, EventService, $scope) {
        let self = this;
        self.$l = $log;
        self.$mdDialog = $mdDialog;
        self.loader = loader;
        self.$scope = $scope;
        self.EventService = EventService;
        self.choosenIconCopy = '';
        self.choosenIcon = '';
        self.EventService.getDefaultIcons().then((resp) => {
            self.iconList = resp.data;
        });
        self.setTopScopeListeners();
    }

    setTopScopeListeners() {
        let self = this;
        self.$scope.$on('iconModal:show', function (event, data) {
            $('.ui.xsmall.modal')
                .modal({
                    onShow    : function(){
                        self.choosenIcon = data;
                        self.choosenIconCopy = self.choosenIcon;
                        self.resetButtonsStyleExceptUrl();
                    },
                    onApprove : function() {
                        self.$scope.$emit("iconModal:hide", {"iconUrl": self.choosenIconCopy});
                    },
                    onDeny : function() {
                        self.$scope.$emit("iconModal:hide", {"iconUrl": self.choosenIcon});
                    }
                })
                .modal('setting', 'closable', false)
                .modal('setting', 'allowMultiple', false)
                .modal('show')
            ;
        });

    }
    resetButtonsStyleExceptUrl(){
        let self = this;
        _.forEach(self.iconList.iconList, (value, key) => {
            self.iconList.iconList[key].color = "transparent";
            self.iconList.iconList[key].border = "none";
            if(self.iconList.iconList[key].url == self.choosenIconCopy)  self.setStyle(self.iconList.iconList[key]);
        });
    }

    resetButtonsStyle(){
        let self = this;
        _.forEach(self.iconList.iconList, (value, key) => {
            self.iconList.iconList[key].color = "transparent";
            self.iconList.iconList[key].border = "none";
        });
    }

    setStyle(item){
        let self = this;
        item.color = "orange";
        item.border = "groove";
    }

    setUrl(item){
        let self = this;
        self.choosenIconCopy = item.url;
        self.resetButtonsStyle();
        self.setStyle(item);
    }

}
export default iconChoiceModal;