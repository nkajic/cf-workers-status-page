import React from 'react'
import config from '../../config.yaml'

export default function MonitorResponses({ monitorId, kvMonitor }) {

  let date = new Date()
  const dayInHistogram = date.toISOString().split('T')[0]
  let content = dayInHistogram

  
  
  return (
    <div className="text-gray-400 text-sm">
      {content}
    </div>
  )
}
