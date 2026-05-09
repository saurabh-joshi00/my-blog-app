import React from 'react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

function ErrorPage() {

  const error = useRouteError();

  let errorMessage;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = `${error.status} - ${error.statusText || error.message}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <>
        <div className={`block w-full h-screen overflow-hidden`}>
            <div className="flex w-full h-full overflow-y-auto bg-black/80 text-white">
                <div className="m-auto">
                    <div className="flex flex-col gap-4 items-center justify-center h-screen text-center">
                        <h1 className='text-4xl font-semibold'>Oops!</h1>
                        <p className='text-xl'>Sorry, an unexpected error has occurred.</p>
                        <p className='text-3xl font-bold'>
                            <i>{errorMessage}</i>
                        </p>

                        <Link to='/' className="btn uppercase bg-black/80 text-center py-2.5 px-4 rounded-full hover:bg-black/50 hover:shadow-sm hover:shadow-white/30 duration-200">
                        Go to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ErrorPage
