import React from 'react'
import {Navigate,Outlet} from 'react-router-dom';
import { isAuthenticated } from './index';


// const PrivateRoutes = ({ component: Component, ...rest }) => {
//   const navigate = useNavigate();

//   return (
//     <Routes>
//       <Route
//         {...rest}
//         path="/user/dashboard/*"
//         render={(props) =>
//           isAuthenticated() ? (
//             <Component {...props} />
//           ) : (
            // <Navigate 
            //     to={{pathname:"/signup",
            //   state:{from: props.location},
            //   }}
            //  />
//           )
//         }
//       />
//     </Routes>
//   );
// };

// export default PrivateRoutes;


// const PrivateRoutes = ({children}) =>{
//   const location = useLocation();
//   const auth = isAuthenticated();
//   if(!auth.user){
//     return <Navigate to='/signup' state={{path:location.pathname}} />
//   }
//   return children

// }

// export default PrivateRoutes;

const PrivateRoutes = () => {

    const auth = isAuthenticated();
        return (      
                auth ? (
                  <Outlet />
                ) : (
                  <Navigate
                    to= '/signin' 
                  />
                )
              )
        
}

export default PrivateRoutes;
