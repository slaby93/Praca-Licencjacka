/**
 * Created by piec on 3/22/2016.
 */
import Moment from 'moment';

class SportEvent {
    constructor(author, createdDate, date, defaultEventIcon, defaultEventImage, description, payment, ownEquipment, experienced, usersLimit, isActive, latitude, longitude, participants = []) {
		
		
		this.author = author;
		this.createdDate = createdDate;
		this.date = date;
		this.defaultEventIcon = defaultEventIcon;
		this.defaultEventImage = defaultEventImage;
		this.eventInfo = {
			"description" : description,
			"payment" : payment,
			"ownEquipment" : ownEquipment,
			"experienced" : experienced,
			"usersLimit" : usersLimit
		}
		this.isActive = isActive;
		this.localization = {
			"latitude" : latitude,
			"longitude" : longitude
		}
		this.participants = participants;
    }
}

export default SportEvent;