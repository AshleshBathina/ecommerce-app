import { useSignIn } from "@clerk/clerk-react"

const LoginPage = () => {

  const { signIn } = useSignIn()

  if (!signIn) return null

  const signInWith = async (strategy) => {
    try {
      const res = await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso',
        redirectUrlComplete: '/'
      })

      console.log(res)

    } catch (e) {
      console.log(e.errors)
      console.error(e, null, 2)
    }


  }

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col justify-center items-center min-h-screen md:flex-row">
        <img className="h-56 md:h-105" src="https://res.cloudinary.com/dcbzlljvr/image/upload/v1769073873/ChatGPT_Image_Jan_21_2026_10_19_20_PM_cb9pwe.png" />
        <div className="flex flex-col w-full px-6 gap-2 md:w-md">
          <button onClick={() => signInWith('oauth_google')} className="flex items-center justify-center px-3 py-3 rounded-3xl border shadow-sm border-gray-300 cursor-pointer hover:bg-gray-100">
            <svg
              viewBox="0 0 48 48"
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>

            <span className="ml-2 font-inter text-xs font-medium">Continue with Google</span>
          </button>

          <button onClick={() => signInWith('oauth_apple')} className="flex items-center justify-center px-3 py-3 rounded-3xl border shadow-sm border-gray-300 cursor-pointer hover:bg-gray-100">
            <img className="size-4" src="https://res.cloudinary.com/dcbzlljvr/image/upload/c_crop,w_44,h_44/v1769078442/siwa-logo-masked-circle_dark_2x_vw0bqw.png" />

            <span className="ml-2 font-inter text-xs font-medium">Continue with Apple</span>
          </button>
          <p className="text-center px-6 mt-4 text-gray-400 font-inter font-medium text-[9px]">By signing up, you agree to our <a className="text-blue-500" href="https://www.google.com/policies/terms/" target="_blank">Terms</a>, <a className="text-blue-500" href="https://www.google.com/policies/privacy/" target="_blank">Privacy Policy</a>, and <a className="text-blue-500" href="https://www.allaboutcookies.org/" target="_blank">Cookie Use.</a></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage