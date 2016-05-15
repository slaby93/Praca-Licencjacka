/**
 * Created by piec on 3/22/2016.
 */
import Moment from 'moment';

class SportEvent {
    constructor(author, createdDate, date, defaultEventIcon, defaultEventImage, description = 'Missing Description', category, payment, ownEquipment, experienced, usersLimit = 0, title = "Missing title", isActive = false, latitude = 50, longitude = 20, participants = []) {


        //IMPORTANT:
        //WHEN CREATING EVENT, THE DATES MUST HAVE HOURS AND MINUTES SET TO 00:00!!!!
        createdDate.setMinutes(0);
        createdDate.setHours(0);
        date.setMinutes(0);
        date.setHours(0);
        //

        this.author = author;
        this.createdDate = createdDate;
        this.date = date;
        this.defaultEventIcon = defaultEventIcon;
        this.defaultEventImage = defaultEventImage;
        this.eventInfo = {
            "description": description,
            "category" : category,
            "payment": payment,
            "ownEquipment": ownEquipment,
            "experienced": experienced,
            "usersLimit": usersLimit,
            "title": title
        }
        this.isActive = isActive;
        this.localization = {
            "latitude": latitude,
            "longitude": longitude
        }
        this.participants = participants;
    }
}

export default SportEvent;