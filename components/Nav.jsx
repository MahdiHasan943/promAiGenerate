"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
  
    useEffect(() => {
      (async () => {
        const res = await getProviders();
        setProviders(res);
      })();
    }, []);

  return (
      <nav className='flex-between w-full mb-16 pt-3'>
           <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
          </Link>
          


                {/* Dekstop Navigation */}
          <div className="sm:flex  hidden">
              {
                  session?.user ? (
            <div className="flex items-center  gap-3 md:gap-5">
               <Link  className='logo_text hover:underline  underline-offset-8' href={'/AllPost'}>Posts </Link>
                          <Link href='/Create-prompt' className='black_btn'>
                              Create Post
                          </Link>
                          <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
                          </button>
                          <Link href='/profile'>
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>

                      </div>
                  ): (
                          <>
                               {providers &&
                  Object.values(providers).map((provider) => (
                <button
                
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
                              
                          </>
                  )
              }

          </div>
          

           {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
                src={session?.user?.image}
                width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown text-center mx-auto'>
                <Link className=' ' href={'/AllPost'}>
                  Posts </Link>

                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/Create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

     </nav>
  )
}

export default Nav