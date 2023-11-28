import React from 'react'
import config from '../../config.yaml'

export default function MonitorResponses({ monitorId, kvMonitor }) {

  const LOC = 'ZAG'
  
  let date = new Date()
  const dayInHistogram = date.toISOString().split('T')[0]
  const location = kvMonitor.checks[dayInHistogram].res[LOC] || {}
  const reqs = location.r || {}

  let content = JSON.stringify(reqs)

  content = Array.from(Object.keys(reqs)).map((key) => {
      let time = key.slice(0, 8)
      let responseTime = parseInt(reqs[key])
      let color = 'text-green-200'
      if (responseTime > 1000) {
        color = 'text-yellow-200'
      } else if (responseTime > 2000) {
        color = 'text-red-200'
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
      Response times from Zagreb only:<br />
      <div class="list">
        {content}
      </div>
    </div>
  )
}
