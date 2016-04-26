/**
 * Created by piec on 3/22/2016.
 */
class User {
    constructor(id, login, groups = ['guest'], email, firstName, lastName, localization = [], phone) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.groups = groups;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.localization = localization;
    }

    isLogged() {
        return (this.login) ? true : false;
    }
}

export default User;