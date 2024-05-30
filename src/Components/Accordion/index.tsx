import React, { useEffect, useRef, useState } from "react";

import styles from "./Accordion.module.scss";

type AccordionProps = {
  title:string,
  content: string
}
const Accordion:React.FC<AccordionProps> = ({title, content}) => {
  const [active, setActive] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
  
  }, [height]);

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${contentRef.current?.scrollHeight}px`);
  }

  return (
    <div className={styles.accordion__section}>
      <div
        className={active ? 
        `${styles.active} ${styles.accordion}` 
            : 
        `${styles.accordion}`}

        onClick={toggleAccordion}>
        <p className={styles.accordion__title}>{title}</p>
        <span style={{ marginLeft: "20px" }}>
          {active ? (
            <div className={styles.plusminus}></div>
            
          ) : (
            <div className={`${styles.plusminus} ${styles.active}`}></div>
          
          )}
        </span>
      </div>
      <div ref={contentRef} style={{ maxHeight: `${height}` }} className={styles.accordion__content}>
        <div
          className={styles.accordion__text}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}

export default Accordion;
