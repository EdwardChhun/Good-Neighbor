import { useState , useEffect, useRef } from 'react'
import { withAuthInfo, useRedirectFunctions, useLogoutFunction} from '@propelauth/react'


const ProfileDropDown = withAuthInfo((props) =>  
{
    //let clientID = "505414270783-c7h6se5gtb1b5iseea98hfbnn7ot5eq5.apps.googleusercontent.com";
    //let clientSecret  = "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";
    const logoutFunction = useLogoutFunction()
    const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions()

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    if (props.isLoggedIn) {
      console.log(props.user);

        return (
          <div className="flex items-center">
          <div ref={dropdownRef} className="z-50">
            <div className="mx-2 z-50 flex justify-center items-center">
                <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative border-b-4 border-transparent py-3 ${isOpen ? 'border-indigo-700 transform transition duration-300' : ''}`}
                >
                <div className="flex justify-center items-center space-x-3 cursor-pointer">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                      <img
                          src={props.user.pictureUrl}
                          alt={props.user.firstName}
                          className="w-full h-full object-cover"
                      />
                    </div>
                </div>
                <div
                    className={`${
                    isOpen ? 'absolute w-36 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5' : 'hidden'
                    }`}
                >
                    <a
                      className="mb-2 dark:text-gray-200 font-medium flex items-center 
                      transform transition-colors duration-200 border-r-4 border-transparent"
                    >
                    {props.user?.firstName}
                    </a>
                    <ul className="space-y-3 dark:text-white">
                      <li className="font-medium">
                        <a
                          href={"profile"}
                          className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                        >
                          Profile
                        </a>
                      </li>
                      
                      <hr className="dark:border-gray-700" />
                      <li className="font-medium">
                          <button
                            onClick={()=> logoutFunction(true)}
                            className="flex items-center text-red-500 transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                          >
                            Logout
                          </button>
                      </li>
                    </ul>
                </div>
                </div>
            </div>
          </div>  
        </div>
        )
    } else {
        return (
          <div className="flex items-center">
          <div ref={dropdownRef} className="z-50">
            <div className="mx-2 z-50 flex justify-center items-center">
                <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative border-b-4 border-transparent py-3 ${isOpen ? 'border-indigo-700 transform transition duration-300' : ''}`}
                >
                <div className="flex justify-center items-center space-x-3 cursor-pointer">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                      <img
                          src="https://static.thenounproject.com/png/5034901-200.png"
                          alt=""
                          className="w-full h-full object-cover"
                      />
                    </div>
                </div>
                <div
                    className={`${
                    isOpen ? 'absolute w-36 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5' : 'hidden'
                    }`}
                >
                    <a
                      className="mb-2 dark:text-gray-200 font-medium flex items-center 
                      transform transition-colors duration-200 border-r-4 border-transparent"
                    >
                    Guest User
                    </a>
                    <ul className="space-y-3 dark:text-white">
                      <li className="font-medium">
                        <a
                          href={"profile"}
                          className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                        >
                          Profile
                        </a>
                      </li>
                      
                      <hr className="dark:border-gray-700" />
                      <li className="font-medium">
                        <button
                            onClick={()=> redirectToLoginPage()}
                            className="flex items-center text-green-200 transform transition-colors duration-200 border-r-4 border-transparent hover:border-green-400"
                          >
                            Sign-in
                          </button>
                      </li>
                    </ul>
                </div>
                </div>
            </div>
          </div>  
        </div>
        )
    }
    
  
})

export default ProfileDropDown
