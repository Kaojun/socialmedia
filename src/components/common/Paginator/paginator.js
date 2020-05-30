import styles from "./paginator.module.css"
import React, {useState} from "react";



export const Paginator = ({totalUsersCount,pageSize,currentPage,onPageChanged}) =>{

let pagesCount = Math.ceil(totalUsersCount / pageSize)    // переменная количество страниц
let pages = [];																											// создаём пустой массив
for (let i = 1; i <= pagesCount; i++) {
	pages.push(i)
}

let portionSize = 10;
let portionCount = Math.ceil(pagesCount/portionSize);
let [portionNumber, setPortionNumber] = useState(1);
let leftPortionNumber = (portionNumber -1) *  portionSize +1;
let rightPortionNumber = portionNumber * portionSize;







return <div>
	{portionNumber >1 &&
	<button onClick={ () => {setPortionNumber(portionNumber-1);
		onPageChanged(leftPortionNumber-portionSize)
	}}
	> PREV </button>}
	{pages
		.filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
		.map(p => {
		return <span onClick={() => onPageChanged(p)}
								 className={currentPage === p && styles.selectedPage}> {p} </span>       // при клике на другую страницу
	})}
	{portionCount > portionNumber &&
		<button onClick={() => {
			setPortionNumber(portionNumber+1)
			onPageChanged(leftPortionNumber+portionSize)
		}
		} > NEXT </button>}
</div>


}