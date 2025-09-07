import Layout from "./Layout"

export default function NoMatch() {

    return(
        <Layout title='404 Page not found' content='Accounts'>
            <div className="container mt-5"> 
                <h1> 404 </h1>
                <h2> Page not found </h2>
            </div>
        </Layout>
    )
}
