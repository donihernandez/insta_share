import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    content="Generated by create next app"
                    name="description"
                />
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <main>
                <h1>Welcome to Insta Share</h1>
            </main>
        </div>
    );
};

export default Home;
