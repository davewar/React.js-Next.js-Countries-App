import Meta from '../components/Meta'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useState} from 'react'
import Pagination from '../components/Pagination';



async function getPosts(){

        const res = await fetch('https://restcountries.eu/rest/v2/all');
        const data = await res.json();

            const country = data.map(item=> {

            let countryItem = {   name: item.name,
                                alpha2Code: item.alpha2Code,
                                capital: item.capital,
                                region: item.region,
                                population: item.population, 
                                 flag:  item.flag

                              }

               return countryItem

            })
        // console.log("DW",data);
                  return country
            }



export const getStaticProps = async ()=>{

  const data = await getPosts()
   return {
      props: {data}
    }

}

export default function Home({data}) {

  const [value,setValue]= useState("")
   const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);
   
     // show items
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  
  // Change page
  const paginate = (pageNumber) =>  setCurrentPage(pageNumber);
   
   
   let newData
     //on change of input box - search all items. Turn off pagination if user is going to search.
   if(value.length >0){

      newData = data.filter( item =>item.name.toLowerCase().includes(value.toLowerCase()))
   } else{
      newData = data.slice(indexOfFirstPost, indexOfLastPost);
   }

  return (
      <>
        <Meta title="About" keywords="flags, county" description="blah blah..." />

        <div className={styles.container}>
              
                <div className={styles.title}>
                    <h1>List of Countrys</h1>
                </div>
                  
                <div>
                  <input type="text"
                  placeholder="search country...." 
                  autoFocus
                  autoComplete="off"
                  input={value}
                  onChange={(e)=>setValue(e.target.value)}
                  className={styles.search}
                  />

                  {
                    value === "" && 
                  
                   <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={data.length}
                        paginate={paginate}
                        setValue={setValue}
                    />
                  }  

                </div>

                      {
                        newData.length <1 ? <div>No Country found</div>
                      : 
                      <div className={styles.countryitem}>
                          <ul className={styles.ulcountry}> 
                              {newData.map((item) =>{
                                  // data.map((item) =>{
                                return <li key={item.alpha2Code} className={styles.licountry}>
                                  <Link  href={"/country/" + item.name} ><a className={styles.linkcountry}>{item.name}</a></Link>
                                  
                                  </li>
                              })
                              }
                          </ul>   
                      </div>  
                  }
                   
                   
                
              
          

          
        </div>
    </>
  )
}
