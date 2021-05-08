import React from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  centered?: boolean;
}

const Loader : React.FC<LoaderProps> = ({centered = false}) => {
  const loader = (    
    <div className={styles['lds-spinner']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
  return (
    <>
      {centered ? <div className={styles.container}>{loader}</div> : <>{loader}</>}
    </>
  );
}

export default Loader;