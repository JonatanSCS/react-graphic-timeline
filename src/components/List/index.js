// Dependencies
import React, { useContext } from 'react'

// Validation
import PropTypes from 'prop-types'

// Components
import FlipMove from 'react-flip-move'

import Row from './Row'

// Context
import { DateContext } from '../../contexts'

/**
  * Reorder Data by current value
  * @param {array} data to reorder
  * @param {string} format of momentjs date
  * @returns {array} data reordered
*/
function reorderData(data, format) {
  const { date, setTopItem } = useContext(DateContext)
  const current = date.format(format)

  const sortedData = data.sort((a, b) => {
    if (a.data[current] > b.data[current]) {
      return -1
    }
    if (a.data[current] < b.data[current]) {
      return 1
    }
    return 0
  })
  setTopItem(sortedData[0])
  return sortedData
}

/**
  * Get higher value of data
  * @param {array} data to reorder
  * @param {string} format of momentjs date
  * @returns {number} higher value
*/
function getMaxByDay(data, format) {
  const { date } = useContext(DateContext)
  const current = date.format(format)

  let max = 0
  data.forEach((item) => {
    max = max < item.data[current] ? item.data[current] : max
  })

  return max
}


/**
  * List component
  * @param {object} props properties for List component
  * @returns {jsx} List component jsx
*/
export default function List(props) {
  const { date, setTopItem } = useContext(DateContext)
  const { data, format, interval } = props
  return (
    <div className="GraphicTimelineList">
      <FlipMove>
        {
          reorderData(data, format).map(item => (
            <Row
              key={item.id}
              current={date.format(format)}
              maxWidth={getMaxByDay(data, format)}
              interval={interval}
              {...item}
            />
          ))
        }
      </FlipMove>
    </div>
  )
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  format: PropTypes.string.isRequired,
  interval: PropTypes.number.isRequired
}
