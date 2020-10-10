import Head from 'next/head'
import React, { Fragment, useEffect } from 'react';
import { useAuth } from '@/lib/auth'
import { Heading, Button, Text } from '@chakra-ui/core';

export default function Home() {
  const auth = useAuth();

  return (
    <div>

      <main>
        <Heading>
          Wisdom's Forest
        </Heading>
        {auth?.user ?
          <Fragment>
            <Text>Logged in with {auth.user.email}</Text>
            <Button onClick={(e) => auth.signOut()}>sign out</Button>
          </Fragment> :
          <Button onClick={(e) => auth.signInWithGithub()}>sign in with Github</Button>
        }


      </main>
    </div>
  )
}
