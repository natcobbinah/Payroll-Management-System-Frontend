export const PATHBASE = 'http://localhost:2345/v1';
export const PARAM_PAGE = 'page=';

//new endpoints corrected
//USERS
export const PATHGETALLUSERS = '/test/users';
export const PATH_ADDUSER  = '/test/user';
export const PATH_DELETEUSER = '/test/deleteusers';
export const PARAM_DELETE = 'values=';
export const PATH_SENDLOGINDETAILS_GMAIL ='/test/sendLoginCredentials';
export const PATH_PATCH_EDITUSER = '/test/user';

//ROLES
export const PATH_GET_ROLES = '/test/role';
export const PATH_DELETE_ROLE = '/test/deleterole';
export const PATH_ADD_ROLE = '/test/role';
export const PATH_PATCH_EDIT_ROLE = '/test/role';
export const PATH_ASSIGNUSERROLES = '/test/assignUserRole';

//DESIGNATIONS
export const PATH_GETALL_DESIGNATION = '/test/designation';
export const PATH_ADD_DESIGNATION = '/test/designation';
export const PATH_DELETE_DESIGNATION = '/test/deletedesignation'
export const PATH_PATCH_DESIGNATION = '/test/designation';
export const PATH_ASSIGNUSERDESIGNATION = '/test/userdesignation'


//end new endpoints corrected


export const PATH_DISABLEUSER = '/test/disableusers';
export const PARAM_DISABLE = 'useridvalues=';



export const PATH_FINDUSERBY_EMAIL = '/test/useremail';
export const PATH_GET_DEPARTMENT = '/test/departments';
export const PATH_ADD_DEPARTMENT = '/test/departments';
export const PATH_DELETE_DEPARTMENT = '/test/deletedepartment';
export const PATH_PATCH_EDITDEPARTMENT = '/test/departments';


export const PATH_VIEW_USERDEPARTMENTS = '/test/userdepartment';

export const PATH_SENDLOGINDETAILS = '/test/sendemail';
export const PATH_LOGINMESSAGE = 'Login with your email and your password is';

export const PATH_ASSIGNUSER_DEPARTMENT = '/test/assignUserDepartment'

export const PATH_GET_ALLUSERROLESBUT_SHOWADMINS = '/test/userroles';



export const PATH_GET_USERDESIGNATIONS = '/test/userdesignation';
export const PATH_DELETE_USERDESIGNATION = '/test/deleteuserdesignation'



//need to implement restendpoints starting from here
export const PATH_GETALL_BENEFITS = '/test/benefit';
export const PATH_POST_BENEFIT = '/test/benefit';
export const NO_OF_DESIGNATIONS = 'designations='

export const PATH_PATCH_BENEFIT = '/test/benefit';
export const PATH_DELETE_BENEFIT = '/test/deletebenefit'

export const PATH_GET_ALL_USERBENEFITS = '/test/userbenefit';
export const PATH_DELETE_USERBENEFIT = '/test/deleteuserbenefit';
export const PATH_POST_USERBENEFIT = '/test/userbenefit';
export const PATH_PATCH_USERBENEFIT = '/test/userbenefit';

//http://localhost:2345/v1/test/userbenefit/{benefitid}/{userid}
//http://localhost:2345/v1/test/deletebenefit{id}
//http://localhost:2345/v1/test/deleteuserbenefit/{id}
//----------need to implemented commented line above


//http://localhost:2345/v1/test/deletedesignation/{id}
//http://localhost:2345/v1/test/designation/{desname}/{deptid}
//http://localhost:2345/v1/test/deleteuserdesignation/{id}
//'http://localhost:2345/v1/test/userdesignation/{userid}/{degsnid}'