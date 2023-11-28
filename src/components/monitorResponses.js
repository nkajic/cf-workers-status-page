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
      let color = 'text-green-200'
      if (responseTime > 1000) {
        color = 'text-yellow-200'
      }
      if (responseTime > 1500) {
        color = 'text-red-800'
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
    <div className="responses text-gray-400 text-sm">
      <p>Vrijeme odgovora za upit iz Zagreba (ms):</p>
      <div class="list">
        {content}
      </div>
    </div>
  )
}
