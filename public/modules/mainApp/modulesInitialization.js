/**
 * Created by piec on 13.03.16.
 */
// -----------------------------------------------------   Libs imports          ------------------------------------------------------------------------------------------

import 'jquery';
import * as angular from 'angular';
import * as ui_router from 'angular-ui-router';
import * as angular_local_storage from 'angular-local-storage';
import * as angular_material from 'angular-material';
import * as angular_material_data_table from 'angular-material-data-table';
import * as ngMessages from 'angular-messages';
import * as angular_jwt from 'angular-jwt';
import * as angular_moment from 'angular-moment';
import * as amMap from 'amcharts/ammap3';
import * as lodash from 'lodash';
import * as ng_file_upload from 'ng-file-upload';
import * as ng_img_crop from 'alexk111/ngImgCrop';
import * as semantic from './../../../semantic/dist/semantic.min'

// -----------------------------------------------------   Config imports        ------------------------------------------------------------------------------------------
import routing from './routing';
import intercepting from './intercepting';
import dateLocaleProvider from './dateLocaleProvider';
// -----------------------------------------------------   Controllers imports   ------------------------------------------------------------------------------------------
import ApplicationController from './application/application.controller.js';
import LoginModalController from './login/loginModal.controller.js';
import IntroductionController from './introduction/introduction.controller';
import HomeController from './home/home.controller.js';
import AccountController from './account/account.controller';
import EventController from './events/event.controller';
import CenterController from './center/center.controller';
import TestController from './test/test.controller';
import UploadModalController from './upload/uploadModal.controller';
import LoginController from './login/login.controller';
import RegisterController from './register/register.controller';
import CreateController from './create/create.controller';
// -----------------------------------------------------   Services imports      ------------------------------------------------------------------------------------------
import UserService from '../services/userService';
import EventService from '../services/eventService';
import LoaderService from '../directives/loader/loader.service';
import GoogleService from '../services/googleService';
// -----------------------------------------------------   Directives imports    ------------------------------------------------------------------------------------------
import HeaderDirective from '../directives/header/header.directive';
import FooterDirective from '../directives/footer/footer.directive';
import PrefooterDirective from '../directives/prefooter/prefooter.directive';
import Prefooter2Directive from '../directives/prefooter2/prefooter2.directive';
import LatestEventsTableDirective from '../directives/latestEventsTable/latestEventsTable.directive';
import QueryTableDirective from '../directives/queryTable/queryTable.directive';
import QueryQuestionaryDirective from '../directives/queryQuestionary/queryQuestionary.directive';
import RetypedPasswordValidatorDirective from '../directives/retypedPasswordValidator/retypedPasswordValidator.directive';
import LoaderDirective from '../directives/loader/loader.directive';
import UserPageDirective from '../directives/userPage/userPage.directive';
import UserSettingsDirective from '../directives/userSettings/userSettings.directive';
import UserObservedDirective from '../directives/userObserved/userObserved.directive';
import UserMailDirective from '../directives/userMail/userMail.directive';
import UserSearchDirective from '../directives/userSearch/userSearch.directive';
import ArchiveEventsTable from '../directives/archiveEventsTable/archiveEventsTable.directive';
import ActiveEventsTable from '../directives/activeEventsTable/activeEventsTable.directive';
import UserCommentsTable from '../directives/userCommentsTable/userCommentsTable.directive';
import WojewodztwaMapDirective from '../directives/wojewodztwaMap/wojewodztwaMap.directive';
import ResultPanelDirective from '../directives/resultPanel/resultPanel.directive';
import EventMapDirective from '../directives/eventMap/eventMap.directive';
import EventBasicInfoDirective from '../directives/eventBasicInfo/eventBasicInfo.directive';
import EventParticipantsListDirective from '../directives/eventParticipantsList/eventParticipantsList.directive';
import SportIconsDirective from '../directives/sportIcons/sportIcons.directive';
import InfoBoxDirective from '../directives/infoBox/infoBox.directive';
import ErrSrcDirective from '../directives/errSrc/errSrc.directive';
import ClickOutsideDirective from '../directives/angularClickOutside/angularClickOutside.directive';
import IconChoiceModalDirective from '../directives/iconChoice/iconChoiceModal.directive';
import CommentsModalDirective from '../directives/commentsModal/commentsModal.directive';
// -----------------------------------------------------   Other imports         ------------------------------------------------------------------------------------------
import Main from '../mainApp/main';
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
angular.module("mainApp", ['ui.router', 'LocalStorageModule', 'ngMaterial', 'md.data.table', 'ngMessages', 'angularMoment', 'angular-jwt', 'ngFileUpload', 'ngImgCrop'])
    .controller("ApplicationController", ApplicationController)
    .controller("LoginModalController", LoginModalController)
    .controller("introductionController", IntroductionController)
    .controller("HomeController", HomeController)
    .controller("AccountController", AccountController)
    .controller("EventController", EventController)
    .controller("CenterController", CenterController)
    .controller("TestController", TestController)
    .controller("UploadModalController", UploadModalController)
    .controller("LoginController", LoginController)
    .controller("RegisterController", RegisterController)
	.controller("CreateController", CreateController)
    .service("UserService", UserService)
    .service("EventService", EventService)
    .service("GoogleService", GoogleService)
    .service("loader", LoaderService)
    .directive("header", HeaderDirective)
    .directive("footer", FooterDirective)
    .directive("prefooter", PrefooterDirective)
    .directive("prefooter2", Prefooter2Directive)
    .directive("latestEventsTable", LatestEventsTableDirective)
    .directive("queryTable", QueryTableDirective)
    .directive("queryQuestionary", QueryQuestionaryDirective)
    .directive("retypedPasswordValidator", RetypedPasswordValidatorDirective)
    .directive("loader", LoaderDirective)
    .directive("userPage", UserPageDirective)
    .directive("userSettings", UserSettingsDirective)
    .directive("userObserved", UserObservedDirective)
    .directive("userMail", UserMailDirective)
    .directive("userSearch", UserSearchDirective)
    .directive("userCommentsTable", UserCommentsTable)
    .directive("activeEventsTable", ActiveEventsTable)
    .directive("archiveEventsTable", ArchiveEventsTable)
    .directive("wojewodztwaMap", WojewodztwaMapDirective)
    .directive("resultPanel", ResultPanelDirective)
    .directive("eventMap", EventMapDirective)
    .directive("eventBasicInfo", EventBasicInfoDirective)
    .directive("eventParticipantsList", EventParticipantsListDirective)
    .directive("sportIcons", SportIconsDirective)
    .directive("infoBox", InfoBoxDirective)
    .directive("errSrc", ErrSrcDirective)
    .directive("clickOutside", ClickOutsideDirective)
    .directive("iconChoiceModal", IconChoiceModalDirective)
    .directive("commentsModal", CommentsModalDirective)
    .config(routing)
    .config(dateLocaleProvider)
    .config(intercepting)
    .run(Main);

