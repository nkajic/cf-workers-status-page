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
      let color = 'text-green-300'
      if (responseTime > 1000) {
        color = 'text-yellow-200'
      }
      if (responseTime > 1500) {
        color = 'text-red-500'
      }
      
      return (
        <div class="item">
          {time}{` `}
          <span className={color}>
            {responseTime}
          </span>
        </div>
      )
    
  })
  
  
  return (
    <div className="responses text-gray-400 text-xs">
      <p>Vrijeme odgovora za upit iz Zagreba (ms):</p>
      <div className="list columns-3 lg:columns-4 xl:columns-5">
        {content}
      </div>
    </div>
  )
}
