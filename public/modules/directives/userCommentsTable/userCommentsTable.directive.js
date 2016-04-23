/**
 * Created by Dammic on 14.03.16.
 */

 
function userCommentsTable() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/userCommentsTable/userCommentsTable.html',
        controller: UserCommentsTableController,
        controllerAs: "userCommentsTableCtrl"
    };
}

class UserCommentsTableController {
    constructor() {
        let self = this;
		
		self.comments = [];
		
		self.totalResults = 0;
		self.totalPages = 1;
		self.limit = 4;
		
		self.positives = 2;
		self.negatives = 1;
		self.commentsCount = 4;
		self.organized = 1;
		self.positivePercentage = self.positives/self.commentsCount * 100 ;
		self.getComments();
	}
	
	paginate(page, limit){
		let self = this;
		console.log("Page: "+page+ " limit: "+limit);
	}
	
	getComments(){
        let self = this;

		self.totalResults = 4;
		self.totalPages = Math.ceil(self.totalResults / self.limit);
		self.comments = [
			{	
				
			},
			{	
				
			},
			{	
				
			},
			{
				
			}
		];
		
		
	}
	

}
		
export default userCommentsTable;