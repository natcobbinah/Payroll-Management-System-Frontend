import {PATHBASE,PATHGETALLUSERS,PATH_GET_ROLES,PATH_GET_DEPARTMENT,
        PATH_GETALL_DESIGNATION,PARAM_PAGE,PATH_GETALL_BENEFITS,PATH_DELETEUSER
       ,PARAM_DELETE,PATH_SENDLOGINDETAILS_GMAIL,PATH_PATCH_EDITUSER} from '../API_URLS'
import axios from 'axios'

//USERS===================================================================================
export  function fetchUsersAll(page){
    return(
        axios.get(`${PATHBASE}${PATHGETALLUSERS}?${PARAM_PAGE}${page}`)
    )   
}

//ROLES===================================================================================
export   function fetchRolesAll(page = 0){
    return (
        axios.get(`${PATHBASE}${PATH_GET_ROLES}?${PARAM_PAGE}${page}`)
    )
} 

//DEPARTMENTS=============================================================================
export function fetchDepartmentsAll(page = 0){
    return(
        axios.get(`${PATHBASE}${PATH_GET_DEPARTMENT}?${PARAM_PAGE}${page}`)
    );
}

//DESIGNATIONS============================================================================
export function fetchDesignationsAll(page = 0){
    return(
        axios.get(`${PATHBASE}${PATH_GETALL_DESIGNATION}?${PARAM_PAGE}${page}`)
    )
}

//BENEFITS================================================================================
export function fetchBenefitAll(page = 0){
    return(
        axios.get(`${PATHBASE}${PATH_GETALL_BENEFITS}?${PARAM_PAGE}${page}`)
    );
}