/**
 * Created by piec on 3/22/2016.
 */
class User {
    constructor(id, login, groups = ['guest'], localization = []) {
        this.id = id;
        this.login = login;
        this.groups = groups;
        this.localization = localization;
    }

    isLogged() {
        return (this.login) ? true : false;
    }
}

export default User;