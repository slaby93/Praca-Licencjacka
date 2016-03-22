/**
 * Created by piec on 3/22/2016.
 */
import Moment from 'moment';

class Event {
    constructor(description = 'test', date = new Moment(), userList = [], localization = '', price = 0) {
        this.description = description;
        this.date = date;
        this.userList = userList;
        this.localization = localization;
        this.price = price;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get userList() {
        return this._userList;
    }

    set userList(tab) {
        this._userList = tab;
    }

    get date() {
        return this._date;
    }

    set date(date) {
        this._date = date;
    }

    get localization() {
        return this._localization;
    }

    set localization(loc) {
        this._localization = loc;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

}

export default Event;