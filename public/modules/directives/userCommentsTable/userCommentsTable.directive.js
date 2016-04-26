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
		self.limit = 9;
		
		self.commentsCount = 4;
		self.positives = 2;
		self.negatives = 1;
		self.neutrals = self.commentsCount - self.negatives - self.positives;
		self.organized = 1;
		self.takenPart = self.commentsCount - self.organized;
		self.positivePercentage = self.positives/self.commentsCount * 100 ;
		
		self.getComments();
	}
	
	paginate(page, limit){
		let self = this;
		console.log("Page: "+page+ " limit: "+limit);
	}
	
	
	//this method should show a panel with a textarea and two buttons (cancel and confirm) 
	showCommentModal(){
		let self = this;
		
		
	
	
		self.addComment();
	
	}
	
	addComment(){
		let self = this;
	
	}
	
	getComments(){
        let self = this;

		self.totalResults = 4;
		self.totalPages = Math.ceil(self.totalResults / self.limit);
		self.comments = [
			{	
				name : "Entyliad",
				role : "Uczestnik",
				type : "Pozytywny",
				date : "15.03.2006",
				content : "Bardzo dobrze zorganizowane wydarzenie, polecam! Bardzo dobrze zorganizowane wydarzenie, polecam! Bardzo dobrze zorganizowane wydarzenie, polecam! Bardzo dobrze zorganizowane wydarzenie, polecam! Bardzo dobrze zorganizowane wydarzenie, polecam! Bardzo dobrze zorganizowane wydarzenie, polecam!",
				response : "~Damian: Dziękuję"
			},
			{	
				name : "Michaiłow22",
				role : "Organizator",
				type : "Neutralny",
				date : "13.03.2006",
				content : "Niby wszystko fajnie, ale musialem isc na piechote",
				response : ""
			},
			{	
				name : "Maria",
				role : "Uczestnik",
				type : "Negatywny",
				date : "11.03.2006",
				content : "Organizator nie znał definicji spotkania sportowego",
				response : "~Damian: Przepraszam, to się już więcej nie powtórzy"
			},
			{
				name : "Optimus_Prime",
				role : "Uczestnik",
				type : "Pozytywny",
				date : "11.03.2006",
				content : "Bardzo dobre spotkanie!",
				response : ""
			}
		];
		
		
	}
	

}
		
export default userCommentsTable;