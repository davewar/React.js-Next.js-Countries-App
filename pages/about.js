import React from 'react'
import Meta from '../components/Meta'
import styles from '../styles/About.module.css'

const About = () => {
    return (
            <>
                <Meta title="About" keywords="flags, county" description="blah blah..." />

                <header className={styles.showcase}>
                        <h1>Welcome to my site</h1>
                </header>

                <div className={styles.content}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus rerum ea neque accusamus recusandae sapiente dolore id laudantium porro labore architecto in, eveniet ad perspiciatis laboriosam explicabo exercitationem! Esse, culpa?
                </div>
            </>
    )
}

export default About
