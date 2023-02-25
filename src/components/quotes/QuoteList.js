import { Fragment } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import QuoteItem from './QuoteItem'
import classes from './QuoteList.module.css'

const sortQuotes = (quotes, ascending) => {
	return quotes.sort((quoteA, quoteB) => {
		if (ascending) {
			return quoteA.id > quoteB.id ? 1 : -1
		} else {
			return quoteA.id < quoteB.id ? 1 : -1
		}
	})
}

const QuoteList = (props) => {
	const history = useHistory()
	const location = useLocation()

	// it is built in browser
	const queryParams = new URLSearchParams(location.search)

	const isSortingAscending = queryParams.get('sort') === 'asc'

	const changeSortHandler = () => {
		//both are ok but this is for more complex paths
		history.push({
			pathname: location.pathname,
			search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
		})
		// history.push(`/${location.pathname}?sort=` + (isSortingAscending ? 'desc' : 'asc'))
	}

	const sortedQuotes = sortQuotes(props.quotes, isSortingAscending)

	return (
		<Fragment>
			<div className={classes.sorting}>
				<button onClick={changeSortHandler}>
					Sort {isSortingAscending ? 'Descending' : 'Ascending'}
				</button>
			</div>
			<ul className={classes.list}>
				{sortedQuotes.map((quote) => (
					<QuoteItem
						key={quote.id}
						id={quote.id}
						author={quote.author}
						text={quote.text}
					/>
				))}
			</ul>
		</Fragment>
	)
}

export default QuoteList
