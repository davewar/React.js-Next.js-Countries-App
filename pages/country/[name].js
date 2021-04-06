import styles from '../../styles/Country.module.css'
import {useRouter }from 'next/router'
// '


export const getStaticPaths = async ()=>{

            const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();

            const paths = data.map(item=>{
                return {
                    params: {name: item.name.toString()}
                }
            })

                // fallback - set to true, if item not found dont do 404, try again with get staticprops for that item
         return {
            paths: paths,
            fallback: true
         }

}

async function getPosts(name){

    // https://restcountries.eu/rest/v2/name/France

   
        const res = await fetch('https://restcountries.eu/rest/v2/name/' + name );
        const data = await res.json();           
        
                  return data
           
}



export const getStaticProps = async (context)=>{

                    const name = context.params.name
                    const data = await getPosts(name)                 
                   
                    return {
                        props: {data}
                        }

}

const Country = (props) => {

                // console.log("DW", props);

                 const router = useRouter()
                // console.log("R",router);
                if(router.isFallback){
                    return <h1>Loading.......</h1>
                }
               


                const {name,flag,population,region,capital} = props.data[0]  
                
                 if(!props.data[0]){
                     return <h1>No Data </h1>
                 }
                //  console.log(name,flag,population,region,capital);
       
       
    return (
        <>
            {
             
             <div className={styles.container}>
            <img src={flag} alt="" className={styles.flagImage} />
                <div className={styles.text}>
                    <h1 className={styles.title}>Name - {name}</h1>
                    <h1 className={styles.title}>Population - {population.toLocaleString()}</h1>
                    <h1 className={styles.title}>Region - {region}</h1>
                    <h1 className={styles.title}>Capitlae - {capital}</h1>

                </div>
            </div>
              
            }
        </>
    )
}

export default Country
