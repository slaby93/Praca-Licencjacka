/**
 * Created by piec on 13.03.16.
 */
// -----------------------------------------------------   Libs imports          ------------------------------------------------------------------------------------------

import * as angular from 'angular';
import * as ui_router from 'angular-ui-router';
import * as angular_local_storage from 'angular-local-storage';
import * as angular_material from 'angular-material';
import * as angular_material_data_table from 'angular-material-data-table'

// -----------------------------------------------------   Config imports        ------------------------------------------------------------------------------------------
import routing from './routing';
// -----------------------------------------------------   Controllers imports   ------------------------------------------------------------------------------------------
import MainController from './controllers/mainAppCtrl';
import LoginModalController from './controllers/loginModal.controller';
// -----------------------------------------------------   Services imports      ------------------------------------------------------------------------------------------
import UserService from '../services/userService';
// -----------------------------------------------------   Directives imports    ------------------------------------------------------------------------------------------
import TopNavbarDirective from '../directives/topNavBar/topNavBar.directive';
import LatestEventsTableDirective from '../directives/latestEventsTable/latestEventsTable.directive';
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
angular.module("mainApp", ['ui.router', 'LocalStorageModule', 'ngMaterial'])
    .controller("MainController", MainController)
    .controller("LoginModalController", LoginModalController)
    .service("UserService", UserService)
    .directive("topNavBar", TopNavbarDirective)
	.directive("latestEventsTable", LatestEventsTableDirective)
    .config(routing);