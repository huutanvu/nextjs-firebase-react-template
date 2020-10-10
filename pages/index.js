import Head from 'next/head'
import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css'
import { useAuth } from '../lib/auth'

export default function Home() {
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Wisdom's Forest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Wisdom's Forest
        </h1>

        <button onClick={(e) => auth.signInWithGithub()}>sign in with Github</button>
        <div>{auth?.user?.email}</div>
        <button onClick={(e) => auth.signOut()}>sign out</button>


      </main>
    </div>
  )
}
