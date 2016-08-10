/**
 * Created by piec on 3/22/2016.
 */
class User {
    constructor(id, login, groups = ['guest'], localization = [], email) {
        this.id = id;
        this.login = login;
        this.groups = groups;
        this.localization = localization;
        this.email = email;
    }

    isLogged() {
        return (this.login) ? true : false;
    }
}

export default User;