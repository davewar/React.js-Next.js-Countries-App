import styles from '../styles/Pagination.module.css'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <ul className={styles.ulItem}>
        {pageNumbers.map(number => (
          <li key={number} className={styles.liItem} onClick={() => paginate(number)}  >
             
              <a className={styles.aItem}> {number} </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
