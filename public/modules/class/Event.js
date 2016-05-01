/**
 * Created by piec on 3/22/2016.
 */
import Moment from 'moment';

class Event {
    constructor(id, author, city, region, createdDate, date, defaultEventIcon = true, defaultEventImage = true, eventInfo = [], isActive, localization = [], participants = []) {
		this.id = id;
		this.author = author;
		this.city = city;
		this.region = region;
		this.createdDate = createdDate;
		this.date = date;
		this.defaultEventIcon = true;
		this.defaultEventImage = true;
		this.eventInfo = eventInfo;    
		this.isActive = isActive;
		this.localization = localization;
		this.participants = participants;
    }
}

export default Event;