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
      let time = key.slice(0, 7)
      let responseTime = reqs[key]
      
      return (
        <div>
          {time} {responseTime}
        </div>
      )
    
  })
  
  
  return (
    <div className="responses text-gray-400 text-sm">
    Zagreb times: <br />
    {content}
    </div>
  )
}
