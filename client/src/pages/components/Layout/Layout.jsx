import React from 'react'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import { Helmet } from 'react-helmet'
const Layout = ({ children , title , description , keyword , author}) => {
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name="description" content={description} />
                <meta name={keyword} content="HTML, CSS, JavaScript" />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <NavBar />
            <main className='min-h-screen'>
                {children}
            </main>
            <Footer />

        </div>
    )
}

Layout.defaultProps = {
    title : "sohalE-store",
    description:"mern stack ecommerse project",
    keywords:"mern , react , node , mongodb",
    author:"sohalrahaman"
}

export default Layout