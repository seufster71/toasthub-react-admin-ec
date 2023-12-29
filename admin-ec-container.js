/*
* Author Edward Seufert
*/
'use strict';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import * as actions from './admin-actions';
import StatusView from '../coreView/status/status-view';
import LoadingView from '../coreView/status/loading-view';
import NavigationView from '../coreView/navigation/navigation-view';
import DashboardContainer from './dashboard/dashboard-container';
import BugsContainer from './bugs/bugs-container';
import AdminView from '../adminView/admin-view';
import fuLogger from '../core/common/fu-logger';
import {PrivateRoute} from '../core/common/router-utils-web';

export default function AdminECContainer({location,navigate}) {
	const session = useSelector((state) => state.session);
	const appMenus = useSelector((state) => state.appMenus);
	const appPrefs = useSelector((state) => state.appPrefs);
	const dispatch = useDispatch();
	
  	useEffect(() => {
    	dispatch(actions.init());
	}, []);

  	const changeTab = (code,index) => {
      navigate(index);
	}

    fuLogger.log({level:'TRACE',loc:'AdminECContainer::render',msg:"path "+ location.pathname});

    let myMenus = [];
    if (appMenus != null && appMenus[appPrefs.adminMenu] != null) {
      myMenus = appMenus[appPrefs.adminMenu];
    }
    let myPermissions = {};
    if (session != null && session.selected != null && session.selected.permissions != null) {
      myPermissions = session.selected.permissions;
    }
    //fuLogger.log({level:'TRACE',loc:'AdminContainer::render',msg:"menus "+ JSON.stringify(myMenus)});
    if (myMenus.length > 0) {
      return (
        <AdminView>
          <NavigationView appPrefs={appPrefs} permissions={myPermissions}
          menus={myMenus} changeTab={changeTab} activeTab={location.pathname} backToTab={"member"} user={session.selected} navigate={navigate}/>
          <StatusView/>
          <Routes>
            <Route index element={<DashboardContainer location={location} navigate={navigate}/>}/>
            <Route element={<PrivateRoute permissions={myPermissions} code="AB" pathto="/access-denied"/>} >
				<Route path="/bugs/*" element={<BugsContainer location={location} navigate={navigate}/>} />
			</Route>
            <Route element={<PrivateRoute permissions={myPermissions} code="ABLA" pathto="/access-denied"/>} >
				<Route path="/buglanes/*" element={<BugsContainer location={location} navigate={navigate}/>} />
			</Route>
          </Routes>
        </AdminView>
      );
    } else {
      return (
        <AdminView> <LoadingView/>
        </AdminView>
      );
    }
}
