import React, { Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';

// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//       let location = useLocation();
//       let navigate = useNavigate();
//       let params = useParams();
//       return (
//         <Component
//           {...props}
//           router={{ location, navigate, params }}
//         />
//       );
//     }

//     return ComponentWithRouterProp;
// }

const currentTab = (location, path) => {

  if (window.location.pathname === path) {
    return { color: '#2ecc72' };
  } else {
    return { color: "#fff" };
  }
};
// const MenuItem = ({history,path }) => { 
// const navigate = useNavigate();
// }


const Menu = ({ location, path }) => {
  // const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <ul className="nav nav-tabs bg-dark text-white">
        <li className="nav-item"><Link style={currentTab(location, "/")} className='nav-link' onClick={() => navigate('/')} replace to="/">Home</Link></li>
        {(isAuthenticated() && (
        <Fragment>
          <li className="nav-item"><Link style={currentTab(location, "/cart")} className='nav-link' onClick={() => navigate('/cart')} replace to="/cart">Cart</Link></li>

          <li className="nav-item"><Link style={currentTab(location, "/user/dashboard")} className='nav-link' onClick={() => navigate('/user/dashboard')} replace to='/user/dashboard'>DashBoard</Link></li>
        </Fragment>

        ))}

        {(!isAuthenticated() && (
        <Fragment>
          <li className="nav-item"><Link style={currentTab(location, "/signup")} className='nav-link' onClick={() => navigate('/signup')} replace to="/signup">SignUp</Link></li>

          <li className="nav-item"><Link style={currentTab(location, "/signin")} className='nav-link' onClick={() => navigate('/signin')} replace to="signin">Signin</Link></li>
        </Fragment>
        ))}

        {(isAuthenticated() && (
        <li className="nav-item">
          <span onClick={() => {
            signout(() => {
              return navigate('/')
            })
          }}
            className="nav-link text-warning">SignOut</span>
          {/* onClick={()=>{
                signout(()=>{
                    location.push("/")
                });
            }}               */}
        </li>
        ))}
      </ul>
    </div>
  )
}

export default Menu;

// style={currentTab(history,"/")}
// style={currentTab(history,"/")}