/**
 * Created by piec on 3/22/2016.
 */
import Moment from 'moment';

class SportEvent {
    constructor(author, createdDate, date, eventIcon, description = 'Missing Description', category, payment, ownEquipment, experience, usersLimit = 0, title = "Missing title", isActive = false, latitude = 50, longitude = 20, participants = []) {

        if(experience < 0 || experience > 5 )  experience = 0;

        this.author = author;
        this.createdDate = createdDate;
        this.date = date;
        this.eventIcon = eventIcon;
        this.eventInfo = {
            "description": description,
            "category" : category,
            "payment": payment,
            "ownEquipment": ownEquipment,
            "experience": experience,
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