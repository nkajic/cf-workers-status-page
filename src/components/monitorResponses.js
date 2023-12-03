import React from 'react'
import config from '../../config.yaml'

export default function MonitorResponses({ monitorId, kvMonitor }) {
  const LOC = 'ZAG'
  
  let date = new Date()
  const dayInHistogram = date.toISOString().split('T')[0]
  const location = kvMonitor.checks[dayInHistogram].res[LOC] || {}
  const reqs = location.r || {}

  let content = Array.from(Object.keys(reqs)).map((key) => {
      let time = key.slice(0, 8)
      let responseTime = parseInt(reqs[key])
      let itemClass = 'good'
      if (responseTime > 1000) {
        itemClass = 'warning'
      }
      if (responseTime > 1500) {
        itemClass = 'not-good'
      }
      
      return (
        <div class="{`item ${itemClass}`}">
          {time}{` `}
          <span>
            {responseTime}
          </span>
        </div>
      )
    
  })
  
  
  return (
    <div className="responses text-gray-400 text-xs md:text-sm lg:base">
      <p>Vrijeme odgovora za upit iz Zagreba (ms):</p>
      <div className="list columns-3 lg:columns-4 xl:columns-5">
        {content}
      </div>
    </div>
  )
}
